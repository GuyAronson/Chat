// type - can be text, photo, video or even audio
export class Message {
    constructor({authorID, time, data, type}) {
        this._authorID = authorID;
        this._timeStamp = time;
        this._data = data;
        this._type = type;
    }
    get authorID() {
        return this._authorID;
    }
    get data() {
        return this._data;
    }
    get type() {
        return this._type;
    }
    get timeStamp() {
        return this._timeStamp
    }
}