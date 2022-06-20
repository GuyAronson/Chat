package com.example.androidchat.entities;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Chat {
    @PrimaryKey @NonNull

    private String ID;
    // username
    private String UserID;
//    private User user;
    private String PartnerID;
//    private Partner partner;
//        private List<Message> messages;

    public String getID() {
        return ID;
    }

    public void setID(String id) {
        this.ID = id;
    }

    public String getUserID() {
        return UserID;
    }

    public void setUserID(String userID) {
        this.UserID = userID;
    }

    public String getPartnerID() {
        return PartnerID;
    }

    public void setPartnerID(String partnerID) {
        this.PartnerID = partnerID;
    }

    public Chat(String userID, String partnerID)
    {
        this.ID = Utils.GenerateRandomID();
        this.UserID = userID;
        this.PartnerID = partnerID;
//        messages = new Messages();
    }
    public Chat(){
        this.ID = Utils.GenerateRandomID();
        UserID = "";
        PartnerID = "";
    }
}
