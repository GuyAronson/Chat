package com.example.androidchat.entities;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Chat {
    @PrimaryKey(autoGenerate = true)
    private int id;
    // username
    private String userID;
//    private User user;
    private String partnerID;
//    private Partner partner;
//        private List<Message> messages;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getPartnerID() {
        return partnerID;
    }

    public void setPartnerID(String partnerID) {
        this.partnerID = partnerID;
    }

    public Chat(String userID, String partnerID)
    {
        userID = userID;
        partnerID = partnerID;
//        messages = new Messages();
    }
    public Chat(){
        userID = "";
        partnerID = "";
    }
}
