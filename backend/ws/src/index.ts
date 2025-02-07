import {
  BTC_WS_URL,
  CLIENT_URL,
  dbResStatus,
  WsChatMessageType,
  WsMessageTypeEnum,
  WSPORT,
  FriendshipStatus,
  TopicTypes,
  JWT,
  HASURA_ADMIN_SERCRET,
  HASURA_URL,
} from "@paybox/common";
import bodyParser from "body-parser";
import express from "express";
import http from "http";
import morgan from "morgan";
import { WebSocketServer } from "ws";
import cors from "cors";
import { EthNetwok } from "./types";
import {
  BTC_ADDRESS,
  ETH_ADDRESS,
  INFURA_PROJECT_ID,
  SOLANA_ADDRESS,
} from "./config";
import { SolTxnLogs } from "./managers/sol";
import { EthTxnLogs } from "./managers/eth";
import { BtcTxn } from "./managers/btc";
import { ChatSub } from "./Redis/ChatSub";
import { extractIdFnc, validateJwt } from "./auth/utils";
import {
  checkFriendship,
  checkValidation,
  extractClientId,
} from "@paybox/backend-common";
import { chatRouter, friendshipRouter } from "./routes";
import { Redis } from "./Redis/ChatCache";
import { NotifWorker } from "./workers/friendship";
import { ChatWorker } from "./workers/chat";
import Prometheus from "prom-client";
import responseTime from "response-time";
import compression from "compression";
import { subscribeNotif } from "./db/notif";

export * from "./managers";

export const app = express();

export const server = http.createServer(app);

export const wss = new WebSocketServer({ server });

// instances of the socket classes
export const solTxn = new SolTxnLogs("devnet", SOLANA_ADDRESS);
export const ethTxn = new EthTxnLogs(
  EthNetwok.sepolia,
  INFURA_PROJECT_ID,
  ETH_ADDRESS,
);
export const btcTxn = new BtcTxn(BTC_WS_URL, BTC_ADDRESS);

const clients: {
  [key: string]: {
    friendshipId: string;
    ws: any;
  };
} = {};

const latencyTime = new Prometheus.Histogram({
  name: "ws_http_request_latency",
  help: "Ws HTTP request response time",
  labelNames: ["method", "route", "status", "contentLength", "contentType"],
  buckets: [1, 50, 100, 200, 400, 500, 600, 800, 1000, 2000],
});

const defaultMetrics = Prometheus.collectDefaultMetrics;
defaultMetrics({ register: Prometheus.register });

app.use(
  compression({
    level: 6,
    threshold: 0,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  }),
);
app.use(bodyParser.json());
app.use(
  morgan("ws :method :url :status :res[content-length] - :response-time ms"),
);

app.use(
  responseTime((req, res, time) => {
    latencyTime
      .labels({
        method: req.method,
        route: req.url,
        status: res.statusCode,
        contentLength: req.headers["content-length"],
        contentType: req.headers["content-type"],
      })
      .observe(time);
  }),
);

const corsOptions = {
  origin: CLIENT_URL, // specify the allowed origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // specify the allowed HTTP methods
  credentials: true, // enable credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204, // handle preflight requests (OPTIONS) with a 204 status code
  allowedHeaders: "Content-Type, Authorization", // specify allowed headers
};

app.use(cors(corsOptions));

app.get("/", (_req, res) => {
  return res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
});

app.get("/_health", (_req, res) => {
  return res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
});

wss.on("connection", async (ws, req) => {
  let id: string;
  const jwt = new URL(
    req.url as string,
    `http://${req.headers.host}`,
  ).searchParams.get("jwt") as string;
  if (!jwt) {
    ws.send(
      JSON.stringify({
        error: "Unauthorized: No jwt provided",
      }),
    );
    ws.close();
  }
  id = (await extractIdFnc(jwt, ws)) as string;

  ws.on("message", async (message) => {
    const data: WsChatMessageType = JSON.parse(message.toString());

    if (data.type == WsMessageTypeEnum.Join) {
      const { friendshipStatus, status } = await checkFriendship(
        data.payload.friendshipId,
        id,
      );
      if (status == dbResStatus.Error) {
        ws.send(
          JSON.stringify({
            error: "Database error",
          }),
        );
        ws.close();
      }
      if (!friendshipStatus) {
        ws.send(
          JSON.stringify({
            type: WsMessageTypeEnum.Chat,
            payload: {
              friendshipId: data.payload.friendshipId,
              message: `No such Friendship: ${data.payload.friendshipId}`,
            },
            error: "Unauthorized: Friendship not accepted",
          }),
        );
        ws.close();
      }

      if (friendshipStatus !== "accepted") {
        ws.send(
          JSON.stringify({
            type: WsMessageTypeEnum.Chat,
            payload: {
              friendshipId: data.payload.friendshipId,
              message: `Friendship status: ${friendshipStatus}`,
            },
            error: "Friendship not accepted",
          }),
        );
        ws.close();
      }

      clients[id] = {
        friendshipId: data.payload.friendshipId,
        ws,
      };
      ChatSub.getInstance().subscribe(data.payload.friendshipId, id, ws);
    }

    if (data.type == WsMessageTypeEnum.Chat) {
      ChatSub.getInstance().sendMessage(data.payload.friendshipId, {
        ...data.payload,
        senderId: id,
      });
    }
  });

  ws.on("close", () => {
    if (clients[id]) {
      ChatSub.getInstance().unsubscribe(id, clients[id].friendshipId);
    } else {
      console.error(`Error: ID ${id} is not connected to any channel.`);
    }
  });
});

app.use("/friendship", extractClientId, friendshipRouter);
app.use("/chat", extractClientId, chatRouter);

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", Prometheus.register.contentType);
  try {
    const metrics = await Prometheus.register.metrics();
    return res.end(metrics);
  } catch (error) {
    console.error("Error while fetching metrics:", error);
    return res.status(500).end("Error while fetching metrics");
  }
});

process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});

process.on("unhandledRejection", function (reason, _promise) {
  console.log("Unhandled Rejection at:", reason);
});

Promise.all([
  new Promise((resolve) => {
    ChatWorker.getInstance().getProducer.on("producer.connect", resolve);
  }),
  new Promise((resolve) => {
    NotifWorker.getInstance().getProducer.on("producer.connect", resolve);
  }),
])
  .then(() => {
    server.listen(WSPORT, async () => {
      console.log(`Server listening on port: ${WSPORT}\n`);
    });
  })
  .catch((error) => {
    console.error("Error while connecting producers:", error);
  });
