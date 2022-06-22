package com.example.androidchat.viewmodels;

import android.content.Context;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.androidchat.entities.Chat;
import com.example.androidchat.entities.Partner;
import com.example.androidchat.repositories.ContactsRepository;

import java.io.Serializable;
import java.util.List;

public class ContactsViewModel extends ViewModel{
    private ContactsRepository contactsRepo;
    private LiveData<List<Chat>> chats;

    public ContactsViewModel(Context context, String username) {
        this.contactsRepo = new ContactsRepository(username, context);
        chats = this.contactsRepo.getAll();
    }

    public LiveData<List<Chat>> getAll() {
        return this.chats;
    }

    public void add(Partner p) {
        this.contactsRepo.AddChat(p);
    }

}
