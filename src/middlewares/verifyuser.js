const UserService = require("../services/user.service");
const { ResponseStatus, ResponseMessage } = require("../enums");
const logger = require('../utils/logger.service').getInstance();
const JwtService = require('../utils/jwt.service');

class VerifyUser {

    constructor() {
        this.userService = new UserService();
    }
    /**
     * Jwt guard for protected routes
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    userJwtGuard = async (req, res, next) => {
        let token, decoded, user;
        // Get authorization token from  request headers
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(
                ResponseStatus.UNAUTHORIZED
            ).json({
                message: ResponseMessage.UNAUTHORIZED
            });
        }
        // Verify the authorization token against stored jwt secret
        try {
            decoded = JwtService.verify(token);
            user = await this.userService.getById(decoded.id);
            if (!user) {
                return res.status(
                    ResponseStatus.UNAUTHORIZED
                ).json({
                    message: ResponseMessage.UNAUTHORIZED
                });
            }
        } catch (error) {
            logger.error(error.message);
            return res.status(
                ResponseStatus.UNAUTHORIZED
            ).json({
                message: ResponseMessage.UNAUTHORIZED
            });
        }
        req.user = user;
        req.userId = user.id;
        next();
    };
}
module.exports = VerifyUser;