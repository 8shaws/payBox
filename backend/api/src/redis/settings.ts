import { RedisClientType } from "redis";
import { Redis } from "..";
import {
  BitcoinCluster,
  BtcExplorer,
  EthCluster,
  EthExplorer,
  ExplorerPref,
  Settings,
  SolCluster,
  SolExplorer,
} from "@paybox/common";

export class SettingsCache {
  private client: RedisClientType;
  private redis: Redis;

  constructor(client: RedisClientType, redis: Redis) {
    this.client = client;
    this.redis = redis;
  }

  async cacheSettings<T extends Settings>(
    key: string,
    value: T,
    expire: number,
  ): Promise<void> {
    //TODO: use json.set after upgrading redis
    await this.client.hSet(key, {
      locale: value.locale,
      testmode: value.testmode == true ? "true" : "false",
      solNet: value.solNet,
      ethNet: value.ethNet,
      btcNet: value.btcNet,
      btcExp: value.btcExp,
      ethExp: value.ethExp,
      solExp: value.solExp,
      clientId: value.clientId || "",
    });
    await this.client.expire(key, expire);
    console.log(`Client Seetings Cached ${key}`);
    return;
  }

  async getSettingsCache<T extends Settings>(
    key: string,
  ): Promise<Settings | null> {
    const settings = await this.client.hGetAll(key);
    if (settings) {
      return {
        locale: settings.locale as string,
        testmode: settings.testmode == "true" ? true : false,
        clientId: settings.clientId as string,
        solNet: settings.solNet as SolCluster,
        ethNet: settings.ethNet as EthCluster,
        btcNet: settings.btcNet as BitcoinCluster,
        btcExp: settings.btcExp as BtcExplorer,
        ethExp: settings.ethExp as EthExplorer,
        solExp: settings.solExp as SolExplorer,
      } as T;
    }
    return null;
  }

  async cacheClientPref(
    key: string,
    item: {
      solExp: SolExplorer;
      btcExp: BtcExplorer;
      ethExp: EthExplorer;
    },
  ) {
    await this.client.hSet(key, item);
    await this.client.expire(key, 60 * 5);
    console.log(`Client pref cached with ${key}`);

    return;
  }

  async getClientPref(key: string): Promise<null | ExplorerPref> {
    const pref = await this.client.hGetAll(key);
    if (!pref) return null;

    return {
      btcExp: pref.btcExp as BtcExplorer,
      ethExp: pref.ethExp as EthExplorer,
      solExp: pref.solExp as SolExplorer,
    };
  }
}
