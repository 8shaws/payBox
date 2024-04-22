import { RedisClientType } from "redis";
import { Redis } from "..";
import { Settings } from "@paybox/common";

export class SettingsCache {
    private client: RedisClientType;
    private redis: Redis;

    constructor(client: RedisClientType, redis: Redis) {
        this.client = client;
        this.redis = redis;
    }

    async cacheSettings<T extends Settings>(key: string, value: T, expire: number): Promise<void> {
        //TODO: use json.set after upgrading redis
        await this.client.hSet(key, {
            locale: value.locale,
            testmode: value.testmode == true ? "true" : "false",
            preferedWallet: value.preferedWallet,
            preferedExplorer: value.preferedExplorer,
            clientId: value.clientId || "",
        });
        await this.client.expire(
            key,
            expire
        );
        console.log(`Client Seetings Cached ${key}`);
        return;
    }

    async getSettingsCache<T extends Settings>(key: string): Promise<Settings | null> {
        const settings = await this.client.hGetAll(key);
        if (settings) {
            return {
                locale: settings.locale as string,
                testmode: settings.testmode == "true" ? true : false,
                preferedWallet: settings.preferedWallet as string,
                preferedExplorer: settings.preferedExplorer as string,
                clientId: settings.clientId as string,
            } as T;
        }
        return null;
    }

}