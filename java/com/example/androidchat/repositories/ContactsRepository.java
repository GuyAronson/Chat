package com.example.androidchat.repositories;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.androidchat.api.API;
import com.example.androidchat.api.WebServiceAPI;
import com.example.androidchat.clientdb.ClientDB;
import com.example.androidchat.daos.ChatDao;
import com.example.androidchat.entities.Chat;
import com.example.androidchat.entities.Partner;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ContactsRepository{
    private ClientDB db;
    private WebServiceAPI api = API.get();
    private ChatDao chatDao;
    private String loggedUser;
    private ChatListData chats;

    class ChatListData extends MutableLiveData<List<Chat>>{
        public ChatListData() {
            super();
            // Get the user's chats from the dao to the Livedata
            setValue(chatDao.getUserChats(loggedUser));
        }

        @Override
        protected void onActive() {
            super.onActive();

            new Thread( () -> {
                chats.postValue(chatDao.getUserChats(loggedUser));
            });
        }
    }

    public ContactsRepository(String username, Context context) {
        this.loggedUser = username;
        this.db = ClientDB.getInstance(context);    // getting the DB
        this.chatDao = db.chatDao();         // Creating the chatDao
        this.chats = new ChatListData();     // Creating the chat list from the dao

        Call<List<Chat>> chatsCall = API.get().getUserChats(username);
        chatsCall.enqueue(new Callback<List<Chat>>() {
            @Override
            public void onResponse(Call<List<Chat>> call, Response<List<Chat>> response) {
                if(response.code() == 200){
                    if(response.body()!= null) {
                        // OK response - insert the chats to the live data
                        chats.setValue(response.body());

                        // Update the chats into the Dao - in another thread
                        new Thread(() -> {
                            chatDao.clearTable();
                            for (Chat chat : response.body()) {
                                chatDao.insert(chat);
                            }
                        }).start();

                        Log.i("ChatRepository", "Got userChats!");
                    }
                } else{
                    Log.i("ChatRepository", "Failure to get the user chats, code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<List<Chat>> call, Throwable t) {
                Log.i("ChatRepository", "Failure to get the user chats");
            }
        });
    }

    public LiveData<List<Chat>> getAll() {
        return this.chats;
    }

    /**
     * This function basically is called from the view model and it creates an api request
     * Note: we assume that the proper validation occurs before this method is being invoked
     * The api, when it is finished does not have to update
     * @param p
     */
    public void AddChat(@NonNull Partner p) {

        // update data in the liveData
        Chat c = new Chat(loggedUser, p.getUsername());
        List<Chat> newList = this.chats.getValue();
        newList.add(c);
        chats.setValue(newList);

        // update the dao
        new Thread(() -> {
            chatDao.insert(c);
        }).start();

        // Send the request to the our API and the contact api - different thread
        Call<Void> addContactCall =  this.api.addContact(this.loggedUser, p);
        addContactCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                Log.i("ContactsRepository", "addContact POST worked!");
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.i("ContactsRepository", "addContact POST failed!");
            }
        });

        Call<Void> invitationCall =  API.set(p.getServerAddress()).sendInvitation(p.getUsername(),
                                                        loggedUser, API.myServerAddress,loggedUser);
        invitationCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                Log.i("ContactsRepository", "invitationCall POST worked! code:"+response.code());
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.i("ContactsRepository", "invitationCall POST failed!");
            }
        });
    }
}
