import { User } from "./User"
import { Chat } from "./Chat"
import { Message } from "./Message";

export class DataBase {
    static users = [
        new User({ username: "idan",  email: "idan@gmail.com",password: "12",  nickname:"LazY",
                picture:'/Pictures/bro3.jpg', chats:["1", "2","3"]}),
        new User({username:"Jhon Cena", email: "jhon@cena.co.il", password: "strongPassword!", nickname: "Not Jhon Cena !",
                picture:'/Pictures/jhonCena.jpeg', chats:["1"]}),
        new User({username:"Muhammad Ali", email: "theGOAT@boxing.com", password: "iBeatFrazier", nickname: "The GOAT",
                picture:"/Pictures/muhammadAli.jpeg", chats:["3"]}),
        new User({username: "Bill Gates", email: "microsoft@isbetter.com", password: "mac4EVER!", nickname: "Billy", 
                picture:"/Pictures/billGates.jpeg", chats: ["4"]}),
        new User({username: "Elon Musk", email: "elon@tesla.com", password: "$teslaStocks!", nickname: "Big Dollar", 
                picture: "/Pictures/elonMusk.jpeg", chats: ["2"]}),
        new User({username: "guy", email: "guy@walla.com", password: "12", nickname: "Guy", 
                picture: "/Pictures/bro4.png", chats: ["4", "5"]}),
        new User({username: "menachem", email: "hemi@biu.ac.il", password: "ap2isAGreatCourse", nickname: "Hemi",
                picture: "/Pictures/hemi.jpeg", chats: ["5"]})
    ];
    static chats = [
        // idan's chats
        new Chat({messages:[
            new Message({authorID: "idan", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Hey", type:"text"}),
            new Message({authorID: "Jhon Cena", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Who dis?", type:"text"}),
            new Message({authorID: "idan", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Its me! who are you?", type:"text"}),
            new Message({authorID: "Jhon Cena", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) , data: "I am:", type:"text"}),
            new Message({authorID: "Jhon Cena", time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), data: "/AudioSegments/jhonCena.mp3", type: "audio"}),
            new Message({authorID: "idan", time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), data: "/VideoSegments/excitedKid.mp4", type: "video"}),
            new Message({authorID: "idan", time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), data: "/Pictures/iLoveYou.png", type: "image"})
        ], userID1: "Jhon Cena", userID2: "idan", chatID: "1"}),
        new Chat({messages:[
            new Message({authorID: "idan", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Wasssuupppppp?!?!!", type:"text"}),
            new Message({authorID: "Elon Musk", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "/VideoSegments/wasup.mp4", type:"video"}),
            new Message({authorID: "Elon Musk", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "How are you?", type:"text"}),
            new Message({authorID: "idan", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Just coding", type:"text"}),
            new Message({authorID: "Elon Musk", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Me also!", type:"text"}),
            new Message({authorID: "Elon Musk", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "/Pictures/letsMakeSomeMoney.jpeg", type:"image"})
        ], userID1: "idan", userID2: "Elon Musk",chatID: "2"}),
        new Chat({messages:[
            new Message({authorID: "Muhammad Ali", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "I would like for them to say he took a few cups of love,", type:"text"}),
            new Message({authorID: "Muhammad Ali", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "he took one tablespoon of patience,", type:"text"}),
            new Message({authorID: "idan", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), data: "one teaspoon of generosity, one pint of kindness", type: "text"}),
            new Message({authorID: "Muhammad Ali", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "He took one quart of laughter, one pinch of concern,", type:"text"}),
            new Message({authorID: "idan", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "and then, he mixed willingness with happiness. He added lots of faith and he stirred it up well.", type:"text"}),
            new Message({authorID: "Muhammad Ali", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Then, he spread it over a span of a lifetime and he served it to each and every deserving person he met.", type:"text"}),
        ], userID1: "idan", userID2: "Muhammad Ali",chatID: "3"}),
    // Guy's chat
    new Chat({messages:[
        new Message({authorID: "Bill Gates", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Hey! How are you?", type:"text"}),
        new Message({authorID: "guy", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Great! How is being rich?", type:"text"}),
        new Message({authorID: "Bill Gates", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "/AudioSegments/yawning.mp3", type:"audio"}),
        new Message({authorID: "Bill Gates", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "BORINGGGG", type:"text"}),
        new Message({authorID: "guy", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "LOL", type:"text"}),
    ], userID1: "Bill Gates", userID2: "guy", chatID: "4"}),
    new Chat({messages:[
        new Message({authorID: "guy", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "What do you think about the chat?!?!!", type:"text"}),
        new Message({authorID: "menachem", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "It is the best one I have seen in my whole life", type:"text"}),
        new Message({authorID: "guy", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "THANK YOU!", type:"text"}),
        new Message({authorID: "menachem", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "And...", type:"text"}),
        new Message({authorID: "menachem", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "You got 100!!!!", type:"text"}),
        new Message({authorID: "guy", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "/VideoSegments/suprised.mp4", type:"video"}),
        new Message({authorID: "menachem", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "/AudioSegments/shhhSound.mp3", type:"audio"}),
        new Message({authorID: "menachem", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Don't tell anyone, it's a secret!", type:"text"}),
    ], userID1: "guy", userID2: "menachem",chatID: "5"}),
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
        const desiredChat = chatsUser1.find(chat=> chat._userID1 === username2 || chat._userID2 === username2);

        return desiredChat;
    }
    //The function creates new chat, add it to the system and return the chat
    static createNewChat(messages, userID1, userID2, chatID=''){
        let chat = new Chat({messages, userID1, userID2, chatID});
        this.chats.push(chat);
        return chat;
    }
}

export default DataBase;