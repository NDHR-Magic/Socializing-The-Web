class Friend {
    constructor(username) {
        this.username = username;
        this.note;
    };
    getnotes() {
        return this.note;
    };
    addNote(note) {
        this.note = note
    };
}

module.exports = Friend;