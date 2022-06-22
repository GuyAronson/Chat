package com.example.androidchat.entities;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class Partner {
    @PrimaryKey @NonNull
    private String Username;
    private String Nickname;
    // This is the server address that this user belongs to
    private String ServerAddress;

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        this.Username = username;
    }

    public String getNickname() {
        return Nickname;
    }

    public void setNickname(String nickname) {
        this.Nickname = nickname;
    }

    public String getServerAddress() {
        return ServerAddress;
    }

    public void setServerAddress(String serverAddress) {
        this.ServerAddress = serverAddress;
    }

    public Partner(String username, String nickname, String serverAddress)
    {
        this.Username = username;
        this.Nickname = nickname;
        this.ServerAddress = serverAddress;
    }
    public Partner()
    {
        this.Username = this.Nickname = this.ServerAddress = "";
    }
    @Override
    public String toString()
    {
        return this.Username + " : " + this.Nickname + " : " + this.ServerAddress;
    }
}
