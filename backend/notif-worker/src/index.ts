import cluster from "cluster";
import express from "express";
import os from "os";

import { KAFKA_ID, KAFKA_URL, PORT } from "./config";
import { Kafka } from "kafkajs";
import { WorkerAdmin } from "./kafka/admin";
import { ConsumerWorker } from "./kafka/consumer";
import { ProducerWorker } from "./kafka/producer";
import Prometheus from "prom-client";
import { TopicTypes } from "@paybox/common";
import twilio from "twilio";
import nodemailer from "nodemailer";
import {
  GMAIL,
  GMAIL_APP_PASS,
  MAIL_SERVICE,
  TWILLO_ACCOUNT_SID,
  TWILLO_TOKEN,
} from "./config";
import { RedisBase } from "@paybox/backend-common";

export const kafka = new Kafka({
  clientId: KAFKA_ID,
  brokers: [KAFKA_URL],
});

export const twillo = twilio(TWILLO_ACCOUNT_SID, TWILLO_TOKEN);
export const transporter = nodemailer.createTransport({
  service: MAIL_SERVICE,
  port: 465,
  secure: true,
  auth: {
    user: GMAIL,
    pass: GMAIL_APP_PASS,
  },
});

const defaultMetrics = Prometheus.collectDefaultMetrics;
defaultMetrics({ register: Prometheus.register });

const workers: { [workerPid: string]: any } = {},
  count = os.cpus().length;

function spawn() {
  const worker = cluster.fork();
  //@ts-ignore
  workers[worker.pid] = worker;
  return worker;
}

if (cluster.isPrimary) {
  for (let i = 0; i < count; i++) {
    spawn();
  }
  cluster.on("death", function (worker: any) {
    console.log("worker " + worker.pid + " died. spawning a new process...");
    delete workers[worker.pid];
    spawn();
  });
  const app = express();

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

  (async () => {
    await WorkerAdmin.getInstance().init([
      { topicName: TopicTypes.Notif, partitions: 1 },
      { topicName: TopicTypes.Db, partitions: 1 },
      { topicName: TopicTypes.Msg, partitions: 1 },
      { topicName: TopicTypes.Txn, partitions: 1 },
    ]);

    // This can be connected in any service/s
    await ProducerWorker.getInstance().connectProducer();
  })();

  Promise.all([
    new Promise((resolve) => {
      RedisBase.getInstance().getclient.on("ready", resolve);
    }),
    new Promise((resolve) => {
      ProducerWorker.getInstance().connectProducer();
    }),
  ])
    .then(() => {
      app.listen(PORT, async () => {
        console.log(`Server listening on port: ${PORT}\n`);
      });
    })
    .catch((error) => {
      console.error("Error while connecting producers:", error);
    });
} else {
  (async () => {
    try {
      await ProducerWorker.getInstance().connectProducer();
      await ConsumerWorker.getInstance().connectCounsumer(
        "worker-group",
        [TopicTypes.Notif, TopicTypes.Msg, TopicTypes.Db, TopicTypes.Txn],
        true,
      );
      await ConsumerWorker.getInstance().runConsumer();
    } catch (error) {
      console.log(`Error in consumer operations: ${error}`);
      process.exit(1);
    }
  })();
}

process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});
