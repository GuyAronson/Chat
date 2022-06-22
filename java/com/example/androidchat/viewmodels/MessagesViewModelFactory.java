package com.example.androidchat.viewmodels;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;

//In order to create view model with parameters we need to create factory class
public class MessagesViewModelFactory implements ViewModelProvider.Factory {
    private String username;
    private String chatID;
    private String partnerName;
    private Context context;
    public MessagesViewModelFactory(String username,String partner,String chatid, Context context) {
        this.username = username;
        this.context = context;
        this.chatID = chatid;
        this.partnerName = partner;
    }
    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        return (T) new MessagesViewModel(context, username,partnerName, chatID);
    }
}
