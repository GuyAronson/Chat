package com.example.androidchat.viewmodels;

import android.content.Context;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.ViewModel;

import com.example.androidchat.entities.Message;
import com.example.androidchat.entities.Partner;
import com.example.androidchat.repositories.MessagesRepository;

import java.util.List;

public class MessagesViewModel extends ViewModel{
    private final MessagesRepository messagesRepo;
    private final LiveData<List<Message>> chats;

    public MessagesViewModel(Context context, String username, String partner, String chatID) {
        this.messagesRepo = new MessagesRepository(username, partner,chatID, context);
        chats = this.messagesRepo.getAll();
    }

    public LiveData<List<Message>> getAll() {
        return this.chats;
    }

    public void add(Message msg, Partner p) {
        this.messagesRepo.AddMessage(msg, p);
    }

    // Function to get the partner object
    public Partner getPartner(String partner){
        return this.messagesRepo.getPartner(partner);
    }

}
