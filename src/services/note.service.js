const Note = require('../models/note.model');
const { ResponseStatus, ResponseMessage, NoteType } = require('../enums');
const PeronalNote = require('../classes/personalnote.class');
const WorkNote = require('../classes/worknote.class');
const RedisService = require('../utils/redis.service');

class NoteService {
    constructor() {
        this.noteModel = Note;
        this.redisService = new RedisService();
    }

    /**
     * Get single user note by bote id
     * @param {*} id 
     * @param {*} userId 
     * @returns 
     */
    getOne = async (id, userId) => {
        const note = await this.noteModel.findOne({
            where: {
                userId,
                id
            }
        });
        return note;
    }

    /**
     * Get all user notes by user id
     * @param {*} userId 
     * @returns 
     */
    getMany = async (userId) => {
        const notes = await this.noteModel.findAll({
            where: {
                userId
            }
        });
        return notes;
    }

    /**
     * Get all user notes by user id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    getAllNotes = async (req, res) => {
        try {
            const { userId } = req;
            const notes = await this.getMany(userId);
            return res.status(
                ResponseStatus.SUCCESS
            ).json({
                data: notes,
                message: ResponseMessage.SUCCESS
            });
        } catch (err) {
            return res.status(
                ResponseStatus.INTERNAL_ERROR
            ).json({
                message: err.message
            });
        }
    }

    /**
     * Get a user note by specified id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    getNoteById = async (req, res) => {
        try {
            const { userId } = req;
            const { id } = req.params;
            const note = await this.getOne(id, userId);
            if (!note) {
                return res.status(
                    ResponseStatus.BAD_REQUEST
                ).json({
                    message: ResponseMessage.NOT_EXIST
                });
            }
            await this.redisService.set(`${id}_${userId}`, note);
            return res.status(
                ResponseStatus.SUCCESS
            ).json({
                data: note,
                message: ResponseMessage.SUCCESS
            });
        } catch (err) {
            return res.status(
                ResponseStatus.INTERNAL_ERROR
            ).json({
                message: err.message
            });
        }
    }

    /**
     * Create a new user note
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    createNote = async (req, res) => {
        try {
            const { userId } = req;
            const { title, content, type } = req.body;
            let note = {};
            if (type === NoteType.PERSONAL) {
                note = new PeronalNote(title, content, userId);
            } else {
                note = new WorkNote(title, content, userId);
            }
            const newNote = await this.noteModel.create(note);
            return res.status(
                ResponseStatus.CREATED
            ).json({
                data: { id: newNote.id },
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

    /**
     * Update user note by note id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    updateNote = async (req, res) => {
        try {
            const { userId } = req;
            const { id } = req.params;
            const { title, content, type } = req.body;
            const note = await this.getOne(id, userId);
            if (!note) {
                return res.status(
                    ResponseStatus.BAD_REQUEST
                ).json({
                    message: ResponseMessage.NOT_EXIST
                });
            }
            note.title = title;
            note.content = content;
            note.type = type;
            const updatedNote = await note.save();
            return res.status(
                ResponseStatus.SUCCESS
            ).json({
                data: { id: updatedNote.id },
                message: ResponseMessage.UPDATED_SUCESSFULLY
            });
        } catch (err) {
            return res.status(
                ResponseStatus.INTERNAL_ERROR
            ).json({
                message: err.message
            });
        }
    }

    /**
     * Delete user note by note id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    deleteNote = async (req, res) => {
        try {
            const { userId } = req;
            const { id } = req.params;
            const note = await this.getOne(id, userId);
            if (!note) {
                return res.status(
                    ResponseStatus.BAD_REQUEST
                ).json({
                    message: ResponseMessage.NOT_EXIST
                });
            }
            await this.noteModel.destroy({
                where: {
                    userId,
                    id
                }
            });
            return res.status(
                ResponseStatus.SUCCESS
            ).json({
                message: ResponseMessage.SUCCESS
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

module.exports = NoteService;