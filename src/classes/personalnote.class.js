const { NoteType } = require("../enums");
const Note = require("./note.class");

class PersonalNote extends Note {
    constructor(title, content, userId) {
        super(title, content, userId);
        this.type = NoteType.PERSONAL;
    }
};

module.exports = PersonalNote;