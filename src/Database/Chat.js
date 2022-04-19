/**
 * This class describes a data structure of a chat
 * it holds all the necesseray data to render the chat and its messages into the UI
 */
import {Message} from './Message'
export class Chat {
    constructor(id, messages, userID1, userID2) {
        this._chatID = id;
        this._messages = [...messages];
        this._userID1 = userID1;
        this._userID2 = userID2;
    }
    get userID1() { return this._userID1;}
    get userID2() { return this._userID2;}
    get messages() {return this._messages;}
    get id() {return this._chatID;}

    // this function will add messages to the chat
    addMessage(message, type, authorID) {
        this.messages.push(
            new Message({authorID, message, time: Date.now, type})
        );
    };
}