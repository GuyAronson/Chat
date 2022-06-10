package com.example.androidchat.entities;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.Date;

@Entity
public class Message {

    @PrimaryKey(autoGenerate = true)
    private int id;
    // The username of the user who sent the message
    private String Author;
    private String Time;
    private String Data;
    private String Type;
    private String ChatID;

    public void setId(int id) {
//        this.id = id;
    }

    public void setTime(String time) {
//        Time = time;
    }

    public void setChatID(String chatID) {
//        ChatID = chatID;
    }

    public int getId() {
        return id;
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
        Author = author;
        Data = data;
        Type = type;
        ChatID = chatid;
        Date d = new Date();
        Time = d.toString();
    }
    public Message()
    {
        Author = Data = Type = ChatID = "";
    }
}
