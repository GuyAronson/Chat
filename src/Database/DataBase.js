import { User } from "./User"
import { Chat } from "./Chat"
import { Message } from "./Message";

export class DataBase {
    static users = [
        new User({ username: "idan",  email: "idanziv7@gmail.com",password: "12",  nickname:"LazY",
                picture:'/pictures/bro2.jpg', chats:["1"]}),
        new User({username:"Jhon Cena", email: "jhon@cena.co.il", password: "strongPassword!", nickname: "Not Jhon Cena !",
                picture:'/Pictures/jhonCena.jpeg', chats:["1","2"]}),
        new User({username:"Mike", email: "foo@kaka.co.il", password: "reactWasFun", nickname: "Mikey",
                picture:'https://randomuser.me/api/portraits/men/3.jpg', chats:["2"]}),
        new User({username:"Sharon Sholdberg", email: "iamrich@wealth.co.il", password: "ilovemon3y", nickname: "Blondie",
                picture:'https://randomuser.me/api/portraits/women/3.jpg', chats:[]}),
        new User({username: "Lisa", email: "test@faker.com", password: "lisa1234!", nickname: "Kitty", 
                picture:"https://randomuser.me/api/portraits/women/1.jpg", chats: []}),
        new User({username: "Elon Musk", email: "elon@tesla.com", password: "$teslaStocks!", nickname: "Big Dollar", 
                picture: "public/Pictures/tesla.png", chats: []})
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
            new Message({authorID: "Jhon Cena", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "wtf", type:"text"}),
            new Message({authorID: "Jhon Cena", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Hey broooo", type:"text"}),
            new Message({authorID: "foo", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey ", type:"text"}),
            new Message({authorID: "foo", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "adssadsd", type:"text"}),
            new Message({authorID: "foo", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), data: "blablabla", type:"text"}),
        ], userID1: "idan", userID2: "Mike",chatID: "2"})
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