package com.example.androidchat.entities;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class Partner {
    @PrimaryKey @NonNull
    private String username;
    private String nickname;
    // This is the server address that this user belongs to
    private String serverAddress;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getServerAddress() {
        return serverAddress;
    }

    public void setServerAddress(String serverAddress) {
        this.serverAddress = serverAddress;
    }

    public Partner(String username, String nickname, String serverAddress)
    {
        username = username;
        nickname = nickname;
        serverAddress = serverAddress;
    }
    public Partner()
    {
        username = nickname = serverAddress = null;
    }
    @Override
    public String toString()
    {
        return this.username+ " : " + this.nickname + " : " + this.serverAddress;
    }
}
