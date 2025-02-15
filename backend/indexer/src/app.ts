import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import { CLIENT_URL, Network } from "@paybox/common";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { SolIndex } from "./index/sol";
import { PayloadParser } from "./types/valid";
import { IndexType } from "./types/enum";
import { EthIndex } from "./index/eth";

export const app = express();
export const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const corsOptions = {
  origin: CLIENT_URL, // specify the allowed origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // specify the allowed HTTP methods
  credentials: true, // enable credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204, // handle preflight requests (OPTIONS) with a 204 status code
  allowedHeaders: "Content-Type, Authorization", // specify allowed headers
};

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
app.use(cors(corsOptions));

wss.on("connection", async (ws) => {
  //todo: add auth
  ws.on("message", async (message) => {
    const data = PayloadParser.parse(JSON.parse(message.toString()));
    console.log(data);
    switch (data.type) {
      case IndexType.Account:
        await SolIndex.getInstance().accSubscribe(data.payload.address, ws);
        break;
      case IndexType.Txn:
        switch (data.chain) {
          case Network.Eth:
            await EthIndex.getInstance().txnSubcribe(
              data.payload.hash,
              data.payload.from,
              data.payload.to,
              ws,
            );
            break;
          case Network.Sol:
            await SolIndex.getInstance().txnSubscribe(
              data.payload.hash,
              data.payload.from,
              data.payload.to,
              ws,
            );
            break;
        }
        break;
      case IndexType.Block:
        await SolIndex.getInstance().blockSubscribe(
          data.payload.address,
          data.payload.values,
          ws,
        );
        break;
      case IndexType.Log:
        switch (data.chain) {
          case Network.Eth:
            await EthIndex.getInstance().log(
              data.payload.address,
              data.payload.topics,
              ws,
            );
            break;

          case Network.Sol:
            await SolIndex.getInstance().logSubcribe(data.payload.from, ws);
            break;
        }
        break;
      case IndexType.Program:
        await SolIndex.getInstance().tokenSubscribe(data.payload.address, ws);
        break;
      default:
        ws.send(JSON.stringify({ error: "Invalid type" }));
        ws.close();
        break;
    }
  });
});

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

process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});

process.on("unhandledRejection", function (reason, _promise) {
  console.log("Unhandled Rejection at:", reason);
});
