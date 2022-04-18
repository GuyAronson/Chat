import User from "./User"
import Chat from './Chat';
var users = [
    new User( "idan",  "idanziv7@gmail.com",
     "123456789",  "LazY","",[])
    ,
    new User("guy", "guy@walla.co.il", "12345678", "guyush", "", [])
]


export var chats = [];

export function addUser(new_user) {
    users.push(new_user);
}

export function deleteUser(user) {
    users = users.filter(value => value.username === user.username);
}

/**
 * function to query the database if the username exists 
 */
export function queryUserName(username) {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log(user.getUsername)
        console.log(user.getUsername === username)
        if (user.getUsername === username) return true;
    }
    return false;
}
/**
 * function to query if the email exisits
 */
export function queryEmail(email) {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log();
        if (user.getEmail === email) return true;
    }
    return false;
}
/**
 * With a given username it returns if the password matches
 */
export function queryPassword(password, name) {
    let u = users.findIndex(user => user.username === name)
    if (u.getpassword === password) {
        return true;
    } else {
        return false;
    }
}

export function getUsers() {
    return users;
}

export function getChats(username) {
    const userChats = chats.filter(chat => chat.user1 === username || chat.user2 === username);
    return userChats;   
}