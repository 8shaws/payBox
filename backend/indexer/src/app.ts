import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import { CLIENT_URL } from "@paybox/common";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

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

app.use(compression({
    level: 6,
    threshold: 0,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));
app.use(bodyParser.json());
app.use(
    morgan("ws :method :url :status :res[content-length] - :response-time ms"),
);
app.use(cors(corsOptions));

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.send("Hello! Message From Server!!");
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
