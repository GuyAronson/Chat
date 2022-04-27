export class User {
    constructor({username, email, password, nickname, picture, chats=[]}) {
        this._username = username;
        this._email = email;
        this._password = password;
        this._nickname = nickname;
        this._picture = picture ? picture: '';
        this._chats = chats;
    }
    get getUsername() {
        return this._username; 
    }
    get getEmail() {
        return this._email;
    }
    get getPassword() {
        return this._password;
    }
    get getNickName() {
        return this._nickname;
    }
    get getChats() {
        return this._chats;
    }
    get getPicture(){
        return this._picture;
    }
    addChat(chatID){
        this._chats.push(chatID);
    }
}