package com.example.androidchat.entities;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class User {
    @PrimaryKey @NonNull
    private String Username;
    private String Email;
    private String Password;
    private String Nickname;
//    public List<Chat> chats;

    public void setUsername(String username) {
        this.Username = username;
    }

    public void setEmail(String email) {
        this.Email = email;
    }

    public void setPassword(String password) {
        this.Password = password;
    }

    public void setNickname(String nickname) {
        this.Nickname = nickname;
    }

    public String getUsername() {
        return Username;
    }

    public String getEmail() {
        return Email;
    }

    public String getPassword() {
        return Password;
    }

    public String getNickname() {
        return Nickname;
    }

    public User(String username, String email, String password, String nickname)
    {
        this.Username = username;
        this.Nickname = nickname;
        this.Password = password;
        this.Email = email;
    }
    public User(String username, String password){
        this.Username = username;
        this.Password = password;
        Nickname = Email = "";
    }
    public User(String username,String nickname, String password){
        this.Username = username;
        this.Nickname = nickname;
        this.Password = password;
    }
    public User(){}
}
