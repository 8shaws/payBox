import { Kafka, Producer } from "kafkajs";
import { INDEXER_KAFKA_ID, INDEXER_KAFKA_URL } from "../config";

export const kafka = new Kafka({
    clientId: INDEXER_KAFKA_ID,
    brokers: [INDEXER_KAFKA_URL],
})

export class Worker {
    private producer: Producer;
    private static instance: Worker;   

    private constructor() {
        this.producer = kafka.producer();
        this.producer.connect();
        this.producer.on('producer.connect', async () => {
            console.log('Producer connected');
        });

        this.producer.on('producer.disconnect', async () => {
            console.log('Producer disconnected');
        });

        this.producer.on('producer.network.request_timeout', async (error) => {
            console.log('Producer error', error);
        })
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Worker();
        }
        return this.instance;
    }

    get getProducer() {
        return this.producer;
    }




}