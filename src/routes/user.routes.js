const router = require('express').Router();
const ValidationMiddleware = require('../middlewares/validation');
const vlidationMidlleware = new ValidationMiddleware();
const logger = require('../utils/logger.service').getInstance();
const UserService = require('../services/user.service');
const userService = new UserService();

/**
 * Route for user registration with api logger and  data validation middlewares
 */
router.post(
    "/register",
    logger.logApi,
    vlidationMidlleware.validateUserRegData,
    userService.createUser
);

module.exports = router;