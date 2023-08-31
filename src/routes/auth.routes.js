const router = require('express').Router();
const logger = require('../utils/logger.service').getInstance();
const ValidationMiddleware = require('../middlewares/validation');
const vlidationMidlleware = new ValidationMiddleware();
const AuthService = require('../services/auth.service');
const authService = new AuthService();

/**
 * Route for user login with jwt 
 * authentication and data validation middlewares
 */
router.post(
    "/login",
    logger.logApi,
    vlidationMidlleware.validateLoginData,
    authService.login
);

module.exports = router;