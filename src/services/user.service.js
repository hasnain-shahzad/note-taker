const User = require('../models/user.model');
const { ResponseStatus, ResponseMessage } = require('../enums');
const HashingService = require('../utils/hashing.service');
const UserObj = require('../classes/user.class');

class UserService {
    constructor() {
        this.userModel = User;
    }

    /**
     * Get user by id
     * @param {*} id 
     * @returns 
     */
    getById = async (id) => {
        const user = await this.userModel.findOne({
            where: {
                id
            }
        });
        return user;
    }

    /**
     * Get user by email
     * @param {*} email 
     * @returns 
     */
    getByEmail = async (email) => {
        const user = await this.userModel.findOne({
            where: {
                email
            }
        });
        return user;
    }

    /**
     * Create a new user
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    createUser = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const userExist = await this.getByEmail(email);
            if (userExist) {
                return res.status(
                    ResponseStatus.BAD_REQUEST
                ).json({
                    message: ResponseMessage.USER_ALREADY_EXIST
                });
            }
            const hashPwd = await HashingService.make(password);
            const userObj = new UserObj(name, email, hashPwd);
            await this.userModel.create(userObj);
            return res.status(
                ResponseStatus.CREATED
            ).json({
                message: ResponseMessage.CREATED_SUCESSFULLY
            });
        } catch (err) {
            return res.status(
                ResponseStatus.INTERNAL_ERROR
            ).json({
                message: err.message
            });
        }
    }
}

module.exports = UserService;