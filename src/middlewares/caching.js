const { ResponseMessage, ResponseStatus } = require("../enums");
const RedisService = require("../utils/redis.service");
const logger = require('../utils/logger.service').getInstance();

class CachingMiddleware {
    constructor() {
        this.redisService = new RedisService();
    }

    getCachedNoteData = async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req;
        const cachedData = await this.redisService.get(`${id}_${userId}`);
        if (cachedData) {
            logger.log(`Returning cached note data`);
            return res.status(
                ResponseStatus.SUCCESS)
                .json({
                    data: JSON.parse(cachedData),
                    message: ResponseMessage.SUCCESS
                })
        } else {
            next();
        }
    }
}

module.exports = CachingMiddleware;