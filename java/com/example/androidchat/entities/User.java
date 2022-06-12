package com.example.androidchat.entities;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.ArrayList;
import java.util.List;

@Entity
public class User {
    @PrimaryKey @NonNull
    private String username;
    private String email;
    private String password;
    private String nickname;
//    public List<Chat> chats;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getNickname() {
        return nickname;
    }

    public User(String username, String email, String password, String nickname)
    {
        username = username;
        email = email;
        nickname = nickname;
        password = password;
    }
    public User(String username, String password){
        username = username;
        password = password;
    }
    public User(){}
}
