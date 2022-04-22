import { User } from "./User"
import { Chat } from "./Chat"
import { Message } from "./Message";

export class DataBase {
    static users = [
        new User({ username: "idan",  email: "idanziv7@gmail.com",password: "12",  nickname:"LazY",
                picture:'/pictures/bro2.jpg', chats:["1"]}),
        new User({username:"guyAronson guyAronson", email: "guy@walla.co.il", password: "12", nickname: "guyush",
                picture:'/pictures/bro.jpg', chats:["1","2"]}),
        new User({username:"foo", email: "foo@kaka.co.il", password: "12", nickname: "foofi",
                picture:'/pictures/bro3.jpg', chats:["2"]}),
        new User({username:"Yossi", email: "Yossi@yahoo.co.il", password: "12", nickname: "Yoske",
                picture:'/pictures/bro4.png', chats:[]}),
    ];
    // static chats = [
    //     new Chat({messages:[
    //         new Message({authorID: "idan", time:  Date(2022,3,22,15,59), data: "Hey", type:"message"}),
    //         new Message({authorID: "guyAronson guyAronson", time: Date(2022,3,22,15,59), data: "Hey bro", type:"message"}),
    //         new Message({authorID: "guyAronson guyAronson", time:  Date(2022,3,22,16,0), data: "How are you ?", type:"message"}),
    //         new Message({authorID: "idan", time: Date(2022,3,22,16,1), data: "Good", type:"message"}),
    //     ], userID1: "guyAronson guyAronson", userID2: "idan", chatID: "1"}),
    //     new Chat({messages:[
    //         new Message({authorID: "guyAronson guyAronson", time:  Date(2022,3,22,15,59), data: "wtf", type:"message"}),
    //         new Message({authorID: "guyAronson guyAronson", time:  Date(2022,3,22,15,58), data: "Hey broooo", type:"message"}),
    //         new Message({authorID: "foo", time: Date(2022,3,22,15,52), data: "Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey ", type:"message"}),
    //         new Message({authorID: "foo", time: Date(2022,3,22,15,52), data: "adssadsd", type:"message"}),
    //         new Message({authorID: "foo", time: Date(2022,3,22,15,52), data: "blablabla", type:"message"}),
    //     ], userID1: "guyAronson guyAronson", userID2: "foo",chatID: "2"})
    // ];
    static chats = [
        new Chat({messages:[
            new Message({authorID: "idan", time:"15:52", data: "Hey", type:"message"}),
            new Message({authorID: "guyAronson guyAronson", time:"15:59", data: "Hey bro", type:"message"}),
            new Message({authorID: "guyAronson guyAronson", time:"16:00", data: "How are you ?", type:"message"}),
            new Message({authorID: "idan", time:"16:01", data: "Good", type:"message"}),
        ], userID1: "guyAronson guyAronson", userID2: "idan", chatID: "1"}),
        new Chat({messages:[
            new Message({authorID: "guyAronson guyAronson", time:"15:58", data: "wtf", type:"message"}),
            new Message({authorID: "guyAronson guyAronson", time:"15:58", data: "Hey broooo", type:"message"}),
            new Message({authorID: "foo", time:"15:52", data: "Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey ", type:"message"}),
            new Message({authorID: "foo", time:"15:52", data: "adssadsd", type:"message"}),
            new Message({authorID: "foo", time:"15:52", data: "blablabla", type:"message"}),
        ], userID1: "guyAronson guyAronson", userID2: "foo",chatID: "2"})
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
    //The function creates new chat, add it to the system and return the chat ID
    static createNewChat(messages, userID1, userID2, chatID=''){
        let chat = new Chat({messages, userID1, userID2, chatID});
        this.chats.push(chat);
        console.log("all chats: ", this.chats);
        return chat.id;
    }
}

export default DataBase;