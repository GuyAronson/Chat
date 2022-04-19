import { User } from "./User"

export class DataBase {
    static users = [
        new User({ username: "idan",  email: "idanziv7@gmail.com",userID: "123456789",  nickname:"LazY"}),
        new User({username:"guy", email: "guy@walla.co.il", userID: "12345678", nickname: "guyush"})
    ];
    static chats = [];

    static addUser(new_user) {
        DataBase.users.push(new_user);
    }
    static deleteUserByID(username) { //userID is username
        const userIndex = DataBase.users.findIndex((user) => user.username === username);
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
        const user = DataBase.users.find((user) => user.username === username);
        // if user does not exists find() will return undefined and '!!' will return negative o.w will return true
        return !!user;
    }
    /**
     * function to query if the email exisits
     */
     static queryEmail(email) {
        const user = DataBase.users.find((user) => user.email === email);
        // if user does not exists find() will return undefined and '!!' will return negative o.w will return true
        return !!user
    }
    /**
     * With a given username it returns if the password matches
     */
     static queryPassword(password, name) {
        const user = DataBase.users.find((user) => user.username === name);
        return user.password === password
    }
    static getUsers() {
        return DataBase.users;
    }
    static getChats(username) {
        const userChats = DataBase.chats.filter(chat => chat.userID2 === username || chat.userID2 === username);
        return userChats;
    }
    static getUserByID(username) {
        const user = DataBase.users.find(user => user._username === username)
        return user;
    }
}