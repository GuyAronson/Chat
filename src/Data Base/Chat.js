/**
 * This class describes a data structure of a chat
 * it holds all the necesseray data to render the chat and its messages into the UI
 */

export class Chat {
    constructor(id, messages, user1, user2) {
        this.chatID = id;
        this.messages = messages;
        this.user1 = user1;
        this.user2 = user2;
    }
    get user1() { return this.user1;}
    get user2() { return this.user2;}
    get messages() {return this.messages;}
    get id() {return this.chatID;}

    // this function will add messages to the chat
    addMessage(msg){};
}