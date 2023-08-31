const { NoteType } = require("../enums");
const Note = require("./note.class");

class WorkNote extends Note {
    constructor(title, content, userId) {
        super(title, content, userId);
        this.type = NoteType.WORK;
    }
}

module.exports = WorkNote;