import { Network, TokenType } from "@paybox/common";
import { RedisClientType } from "redis";
import { Redis } from "../Redis";

export class TokenCache {
  private client: RedisClientType;
  private redis: Redis;

  constructor(client: RedisClientType, redis: Redis) {
    this.client = client;
    this.redis = redis;
  }

  async cacheTokens(key: string, tokens: TokenType[], expire: number) {
    const promises = tokens.map((token) => {
      return new Promise(async (resolve) => {
        await this.client.HSET(token.id, {
          id: token.id,
          authority: token.authority,
          pubKey: token.pubKey,
          name: token.name,
          description: token.description,
          network: token.network,
          clientId: token.clientId,
        });
        await this.client.expire(token.id, expire);
      });
    });

    await Promise.all(promises);
    console.log(`Caching tokens for ${tokens[0].clientId}`);
  }
}
