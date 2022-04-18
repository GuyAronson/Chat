// type - can be text, photo, video or even audio
class Message {
    constructor(authorID, recipientID, time, data, type) {
        this.authorID = authorID;
        this.recipientID = recipientID;
        this.timeStamp = time;
        this.data = data;
        this.type = type;
    }
    get author() {
        return this.authorID;
    }
    get recipient() {
        return this.recipientID;
    }
    get data() {
        return [this.data, this.type];
    }
}