const { createClient } = require('redis');
const logger = require('../utils/logger.service').getInstance();
require('dotenv').config();

class RedisService {
    constructor() {
        if (RedisService.instance) {
            return RedisService.instance;
        }
        (async () => {
            const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
            try {
                this.redisClient = createClient({
                    url
                });
                await this.redisClient.connect();
                logger.log("Redis client connected successfully");
            } catch (err) {
                logger.error("Redis client connection error", err.message);
            }
        })();
        RedisService.instance = this;
    }

    get = async (key) => {
        const value = await this.redisClient.get(`${key}`);
        return value;
    }

    set = async (key, value) => {
        await this.redisClient.set(`${key}`, JSON.stringify(value), {
            EX: 30
        });
        return;
    }
}
module.exports = RedisService;