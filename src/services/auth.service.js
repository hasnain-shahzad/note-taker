const User = require('../models/user.model');
const { ResponseStatus, ResponseMessage } = require('../enums');
const HashService = require('../utils/hashing.service');
const JwtService = require('../utils/jwt.service');

class AuthService {
    constructor() {
        this.userModel = User;
    }

    /**
     * Login user with valid credentials
     * @param {*} req 
     * @param {*} res 
     * @returns token
     */
    login = async (req, res) => {
        const { email, password } = req.body;
        const user = await this.userModel.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(
                ResponseStatus.BAD_REQUEST
            ).json({
                messgae: ResponseMessage.INVALID_USERNAME_PASSWORD
            })
        }
        if (!user.password) {
            return res.status(
                ResponseStatus.BAD_REQUEST
            ).json({
                messgae: ResponseMessage.PASSWORD_NOT_SET
            })
        }
        const isValidPassword = await HashService.compare(
            password,
            user.password,
        );
        if (!isValidPassword) {
            return res.status(
                ResponseStatus.BAD_REQUEST
            ).json({
                messgae: ResponseMessage.INVALID_USERNAME_PASSWORD
            })
        }
        const userToken = JwtService.generateToken(user.id);
        return res.status(ResponseStatus.SUCCESS).json({ data: userToken, message: ResponseMessage.SUCCESS });
    }
}

module.exports = AuthService;