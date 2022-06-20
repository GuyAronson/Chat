package com.example.androidchat.viewmodels;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;

//In order to create view model with parameters we need to create factory class
public class ContactsViewModelFactory implements ViewModelProvider.Factory {
    private String username;
    private Context context;
    public ContactsViewModelFactory(String username, Context context) {
        this.username = username;
        this.context = context;
    }
    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        return (T) new ContactsViewModel(context, username);
    }
}
