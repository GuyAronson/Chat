import { User } from "./User"
import { Chat } from "./Chat"
import { Message } from "./Message";

export class DataBase {
    static users = [
        new User({ username: "idan",  email: "idanziv7@gmail.com",password: "12",  nickname:"LazY", chats:["1"]}),
        new User({username:"guy", email: "guy@walla.co.il", password: "12", nickname: "guyush",
                chats:["1","2"]}),
        new User({username:"foo", email: "foo@kaka.co.il", password: "12", nickname: "foofi",
        chats:["2"]}),
    ];
    static chats = [
        new Chat({messages:[
            new Message({authorID: "guy", time:"15:59", data: "Hey bro", type:"message"}),
            new Message({authorID: "idan", time:"15:52", data: "Hey", type:"message"})
        ], userID1: "guy", userID2: "idan", chatID: "1"}),
        new Chat({messages:[
            new Message({authorID: "guy", time:"15:58", data: "wtf", type:"message"}),
            new Message({authorID: "foo", time:"15:52", data: "plupluplu", type:"message"})
        ], userID1: "guy", userID2: "foo",chatID: "2"})
    ];

    static addUser(new_user) {
        DataBase.users.push(new_user);
    }
    static deleteUserByID(username) { //userID is username
        const userIndex = DataBase.users.findIndex((user) => user._username === username);
        if (userIndex === -1) {
            console.error('user' + {username} + 'is not in the database.');
        } else {
            DataBase.users = DataBase.users.splice(userIndex, 1);
        }
    }

    /**
     * function to query the database if the username exists
     */
    static queryUserName(username) {
        const user = DataBase.users.find((user) => user._username === username);
        // if user does not exists find() will return undefined and '!!' will return negative o.w will return true
        return !!user;
    }
    /**
     * function to query if the email exisits
     */
     static queryEmail(email) {
        const user = DataBase.users.find((user) => user._email === email);
        // if user does not exists find() will return undefined and '!!' will return negative o.w will return true
        return !!user
    }
    /**
     * With a given username it returns if the password matches
     */
     static queryPassword(password, name) {
        const user = DataBase.users.find((user) => user._username === name);
        return user._password === password
    }
    static getUsers() {
        return DataBase.users;
    }
    static getChats(username) {
        const userChats = DataBase.chats.filter(chat => (chat.userID1 === username || chat.userID2 === username));
        return userChats;
    }
    // Returns user object by username
    static getUserByID(username){
        const user = DataBase.users.find(user=> user._username === username);
        return user;
    }
    // Returns chat by chat id
    static getChatByID(chatID){
        const chat = DataBase.chats.find(chat=> chat._chatID === chatID);
        return chat;
    }
    static getChatByBothUsers(username1, username2){
        let chatsUser1 = this.getChats(username1);
        const desiredChat = chatsUser1.find(chat=> chat._userID1 == username2 || chat._userID2 == username2);

        return desiredChat;
    }
}

export default DataBase;