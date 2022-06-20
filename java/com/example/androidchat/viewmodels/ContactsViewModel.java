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
//    private LiveChats chats;
    private LiveData<List<Chat>> chats;

    public ContactsViewModel(Context context, String username) {
        this.contactsRepo = new ContactsRepository(username, context);
        chats = this.contactsRepo.getAll();
//        chats = new LiveChats(this.contactsRepo.getAll());
    }

    public LiveData<List<Chat>> getAll() {
        return this.chats;
    }

    public void add(Partner p) {
        this.contactsRepo.AddChat(p);
    }

//    class LiveChats extends LiveData<List<Chat>> implements Serializable {
//        public LiveChats() {
//            super();
//        }
//        public LiveChats(LiveData<List<Chat>> chats) {
//            super();
//            this.setValue(chats.getValue());
//        }
//    }
}
