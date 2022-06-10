package com.example.androidchat.entities;

import java.util.ArrayList;
import java.util.List;

public class Messages {
    private List<Message> messages;

    public Messages(){
        messages = new ArrayList<>();
    }
    public Messages(List<Message> m){
        messages = m;
    }

    List<Message> get(){
        return  messages;
    }

    void add(Message m){
        messages.add(m);
    }
    void delete(Message m){
        messages.remove(m);
    }
}
