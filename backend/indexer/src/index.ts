import cluster from "cluster";
import os from "os";
import {server} from "./app";
import { Worker } from "./worker/producer";
import { INDEXER_PORT } from "./config";
import { SolIndex } from "./index/sol";

const cpuCount = os.cpus().length - 2;

if (cluster.isPrimary) {
    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
} else {

    Promise.all([
        new Promise((resolve) => {
            Worker.getInstance().getProducer.on("producer.connect", resolve);
        }),
        new Promise((resolve) => {
            SolIndex.getInstance().wsInstance.on("open", resolve);
        }),
    ]).then(() => {
        server.listen(INDEXER_PORT, async () => {
            console.log(`Server listening on port: ${INDEXER_PORT}\n`);
        });
    }).catch((err) => {
        console.log("Error in starting server");
        console.log(err);
    })
}