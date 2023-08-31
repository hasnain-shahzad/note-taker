const { ResponseStatus, NoteType } = require("../enums");
const logger = require('../utils/logger.service').getInstance();
const Joi = require('joi');

class ValidationMiddleware {

    validateLoginData = async (req, res, next) => {
        try {
            const loginData = req.body;
            const schema = Joi.object({
                email: Joi.string()
                    .required(),
                password: Joi.string()
                    .required()
            });
            await schema.validateAsync(loginData);
            next();
        } catch (err) {
            logger.error(`Validation error: ${err.message}`)
            return res.status(
                ResponseStatus.BAD_REQUEST
            ).json({
                message: err.message
            });
        }
    }

    validateUserRegData = async (req, res, next) => {
        try {
            const userData = req.body;
            const schema = Joi.object({
                name: Joi.string()
                    .min(5)
                    .max(20)
                    .required(),
                password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{8,10}$')),
                email: Joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            });
            await schema.validateAsync(userData);
            next();
        } catch (err) {
            logger.error(`Validation error: ${err.message}`)
            return res.status(
                ResponseStatus.BAD_REQUEST
            ).json({
                message: err.message
            });
        }
    };

    validateParamId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const isValidNumber = Number(id);
            if (!isValidNumber) {
                logger.error(`Validation error: Invalid param id`)
                return res.status(
                    ResponseStatus.BAD_REQUEST
                ).json({
                    message: `Validation error: Invalid param id`
                });
            }
            next();
        } catch (err) {
            logger.error(`Validation error: ${err.message}`)
            return res.status(
                ResponseStatus.BAD_REQUEST
            ).json({
                message: err.message
            });
        }

    }

    validateNoteData = async (req, res, next) => {
        try {
            const noteData = req.body;
            const schema = Joi.object({
                title: Joi.string()
                    .min(1)
                    .max(100)
                    .required(),
                content: Joi.string()
                    .min(1)
                    .max(500)
                    .required(),
                type: Joi.string()
                    .valid(NoteType.PERSONAL, NoteType.WORK)
                    .required()
            });
            await schema.validateAsync(noteData);
            next();
        } catch (err) {
            logger.error(`Validation error: ${err.message}`)
            return res.status(
                ResponseStatus.BAD_REQUEST
            ).json({
                message: err.message
            });
        }
    };
}
module.exports = ValidationMiddleware;