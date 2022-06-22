package com.example.androidchat.entities;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.Date;

@Entity
public class Message {
    @PrimaryKey @NonNull
    private final String ID;
    // The username of the user who sent the message
    private String Author;
    private String Time;
    private String Data;
    private String Type;
    private final String ChatID;

    public void setID(String ID) {
//        this.id = id;
    }

    public void setTime(String time) {
        Time = time;
    }

    public void setChatID(String chatID) {
//        ChatID = chatID;
    }

    public String getID() {
        return ID;
    }

    public String getTime() {
        return Time;
    }

    public String getChatID() {
        return ChatID;
    }

    public String getAuthor() {
        return Author;
    }

    public void setAuthor(String author) {
        Author = author;
    }

    public String getData() {
        return Data;
    }

    public void setData(String data) {
        Data = data;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    public Message(String author, String data, String type, String chatid)
    {
        ID = Utils.GenerateRandomID();
        Author = author;
        Data = data;
        Type = type;
        ChatID = chatid;
        Date d = new Date();
        String t =d.toString();
        int k = t.indexOf(':');
        Time = t.substring(k-2,k+2);
    }
    public Message()
    {
        ID = Utils.GenerateRandomID();
        Author = Data = Type = ChatID = "";

    }
}
