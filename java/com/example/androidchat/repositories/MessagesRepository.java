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
import com.example.androidchat.daos.MessageDao;
import com.example.androidchat.daos.PartnerDao;
import com.example.androidchat.entities.Chat;
import com.example.androidchat.entities.Message;
import com.example.androidchat.entities.Partner;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MessagesRepository{
    private final ClientDB db;
    private final WebServiceAPI api = API.get();
    private final MessageDao messageDao;
    private final PartnerDao partnerDao;
    private final String loggedUser;
    private final MessageListData messages;

    class MessageListData extends MutableLiveData<List<Message>>{
        private final String chatID;
        public MessageListData(String id) {
            super();
            // Get the user's chats from the dao to the Livedata
            this.chatID = id;
            setValue(new ArrayList<>());    // default
            new Thread(()->{
                // Bring all messages from dao
                List<Message> msgs =messageDao.getFromChat(this.chatID);
                postValue(msgs);
            }).start();
        }

        @Override
        protected void onActive() {
            super.onActive();

            new Thread( () -> {
                List<Message> msgs =messageDao.getFromChat(this.chatID);
                postValue(msgs);
            }).start();
        }
    }

    public MessagesRepository(String username,String partner,String chatID, Context context) {
        this.loggedUser = username;
        this.db = ClientDB.getInstance(context);    // getting the DB
        this.messageDao = db.messageDao();         // Creating the messageDao
        this.partnerDao = db.partnerDao();         // Creating the partnerDao
        this.messages = new MessageListData(chatID);     // Creating the message list from the dao

        Call<List<Message>> messagesCall = API.get().getMessages(partner,username);
        messagesCall.enqueue(new Callback<List<Message>>() {
            @Override
            public void onResponse(Call<List<Message>> call, Response<List<Message>> response) {
                if(response.code() == 200){
                    if(response.body()!= null) {
                        List<Message> listMsgs = response.body();
                        for (Message msg : listMsgs) {
                            String time = msg.getTime();
                            int i = time.indexOf(':');
                            String hour = time.substring(i-2,i+3);
                            msg.setTime(hour);
                        }
                        // OK response - insert the messages to the live data
                        messages.setValue(listMsgs);

                        // Update the messages into the Dao - in another thread
                        new Thread(() -> {
                            messageDao.clearTable();
                            for (Message msg : listMsgs) {
                                messageDao.insert(msg);
                            }
                        }).start();

                        Log.i("MessagesRepository", "Got messages with "+partner+" !");
                    }
                } else{
                    Log.i("MessagesRepository", "Failure to get the messages, code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<List<Message>> call, Throwable t) {
                Log.i("MessagesRepository", "Failure to get the messages");
            }
        });
    }

    public LiveData<List<Message>> getAll() {
        return this.messages;
    }

    // Function to get the partner object
    public Partner getPartner(String username){
//        List<Partner> allpartners = partnerDao.getAll();
        return partnerDao.get(username);
    }

    /**
     * This function basically is called from the view model and it creates an api request
     * Note: we assume that the proper validation occurs before this method is being invoked
     * The api, when it is finished does not have to update
     * @param msg - message to be added
     */
    public void AddMessage(@NonNull Message msg, Partner p) {

        // update data in the liveData
        List<Message> newList = this.messages.getValue();
        assert newList != null;
        newList.add(msg);
        messages.setValue(newList);

        // update the dao
        new Thread(() -> {
            messageDao.insert(msg);
        }).start();

        // Send the request to the our API and the contact api - different thread
        Call<Void> addMsgCall =  this.api.addMessage(p.getUsername(), loggedUser, msg.getData());
        addMsgCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                Log.i("MessagesRepository", "addMessage POST worked!");
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.i("MessagesRepository", "addMessage POST failed!");
            }
        });

        // Change the partner serverAddress - to match to Android
        if(p.getServerAddress().contains("localhost")){
            p.setServerAddress(p.getServerAddress().replace("localhost","10.0.2.2"));
        }
        Call<Void> transferCall =  API.set(p.getServerAddress()).trasnferMessage(p.getUsername(),
                                    loggedUser, msg.getData());
        transferCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                Log.i("MessagesRepository", "transferCall POST worked! code:"+response.code());
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.i("MessagesRepository", "transferCall POST failed!");
            }
        });
    }
}
