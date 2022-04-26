/**
 * This class describes a data structure of a chat
 * it holds all the necesseray data to render the chat and its messages into the UI
 */
import {Message} from './Message'
export class Chat {
    constructor({messages, userID1, userID2, chatID=''}) {
        if(chatID)
            this._chatID = chatID;
        else
            this._chatID = this.generatRandomID();
        // this._messages = [...messages];
        this._userID1 = userID1;
        this._userID2 = userID2;
        this._messages = messages;
    }
    get userID1() { return this._userID1;}
    get userID2() { return this._userID2;}
    get messages() {return this._messages;}
    get id() {return this._chatID;}

    // this function will add messages to the chat
    addMessage(message, type, authorID) {
        let now = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        this.messages.push(
            // new Message({authorID: authorID, time: new Date(), data: message,type: type})
            new Message({authorID: authorID, time: now, data: message,type: type})
        );
    };
    generatRandomID() {
        let result = ''
        let config = [8, 4, 4, 4, 12]
        for (let x in config) {
            let r = (Math.random() + 1).toString(36).substring(2, 2 + config[x]);
            result += r
            if (parseInt(x) !== config.length - 1) result += '-'
        }
        return result
    }
}