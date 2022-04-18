class User {
    constructor(username, email, password, nickname, picture="", chats=[]) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.picture = picture;
        this.chats = chats;
    }
    get getUsername() {
        return this.username; 
    }
    get getEmail() {
        return this.email;
    }
    get getPassword() {
        return this.password;
    }
    get getNickName() {
        return this.nickname;
    }
    get getChats() {
        return this.chats;
    }
}

export default User;