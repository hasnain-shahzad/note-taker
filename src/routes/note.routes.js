const router = require('express').Router();
const logger = require('../utils/logger.service').getInstance();
const AuthMiddleware = require('../middlewares/verifyuser');
const authMiddleware = new AuthMiddleware();
const ValidationMiddleware = require('../middlewares/validation');
const vlidationMidlleware = new ValidationMiddleware();
const CachingMiddleware = require('../middlewares/caching');
const cachingMidlleware = new CachingMiddleware();
const NoteService = require('../services/note.service');
const noteService = new NoteService();

/**
 * Route for getting all user notes with jwt authentication and api logger
 */
router.get(
    "/",
    logger.logApi,
    authMiddleware.userJwtGuard,
    noteService.getAllNotes
);

/**
 * Route for getting single user note by id with jwt authentication , id parameter validation and api logger
 */
router.get(
    "/:id",
    logger.logApi,
    authMiddleware.userJwtGuard,
    vlidationMidlleware.validateParamId,
    cachingMidlleware.getCachedNoteData,
    noteService.getNoteById
);


/**
 * Route for cretaing a new note of user with jwt authentication ,
 * note data validation and api logger
 */
router.post(
    "/",
    logger.logApi,
    authMiddleware.userJwtGuard,
    vlidationMidlleware.validateNoteData,
    noteService.createNote
);

/**
 * Route for updating an existing user note with jwt authentication , 
 * data validation , id parameter validation and api logger
 */
router.put(
    "/:id",
    logger.logApi,
    authMiddleware.userJwtGuard,
    vlidationMidlleware.validateParamId,
    vlidationMidlleware.validateNoteData,
    noteService.updateNote
);

/**
 * Route for deleting a user note with jwt authentication
 * and data validation 
 */
router.delete(
    "/:id",
    logger.logApi,
    authMiddleware.userJwtGuard,
    vlidationMidlleware.validateParamId,
    noteService.deleteNote
);

module.exports = router;