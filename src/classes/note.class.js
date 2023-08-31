
class Note {
    constructor(title, content, userId) {
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.createdOn = new Date();
    }
}

module.exports = Note;