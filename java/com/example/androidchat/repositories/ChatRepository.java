package com.example.androidchat.repositories;

import android.app.Application;
import android.os.AsyncTask;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.androidchat.api.API;
import com.example.androidchat.clientdb.ClientDB;
import com.example.androidchat.daos.ChatDao;
import com.example.androidchat.daos.PartnerDao;
import com.example.androidchat.entities.Chat;
import com.example.androidchat.entities.Partner;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ChatRepository {
    private final ChatDao chatDao;
    private final PartnerDao partnerDao;
    private MutableLiveData<List<Chat>> chats;
    private final ClientDB db;
    String username;
//    private API api;

    ChatRepository(Application application, String uname){
        db = ClientDB.getInstance(application);
        partnerDao = db.partnerDao();
        chatDao = db.chatDao();
        username = uname;
        chats = new MutableLiveData<>();

        // Get the user's chats from the dao to the Livedata
        List<Chat> userChats = chatDao.getUserChats(username);
        chats.setValue(userChats);

        // Now get the chats from the api
        Call<List<Chat>> call = API.get().getUserChats(username);
        call.enqueue(new Callback<List<Chat>>() {
            @Override
            public void onResponse(Call<List<Chat>> call, Response<List<Chat>> response) {
                if(response.code() == 200){
                    // OK response - insert the chats to the live data
                    chats.setValue(response.body());
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

    public void insert(Chat chat, Partner partner, String userServerAddress){
        new InsertChatAsyncTask(chatDao).execute(chat);
        new InsertPartnerAsyncTask(partnerDao).execute(partner);
        chats.getValue().add(chat);     // Check if the list has been updated!

        // Add a POST request /api/contacts
        Call<Void> callAddContact = API.get().addContact(username, partner);
        callAddContact.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                int code =response.code();
                if((int)(code/100) != 2){
                    Log.i("ChatRepository", "onResponse - Failure on POST /api/contacts, code: "+ code);
                } else{
                    Log.i("ChatRepository", "Success on POST /api/contacts");
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.i("ChatRepository", "Failure on POST /api/contacts");
            }
        });

        // Invitation POST request - swap the user's details and the partner's details
        Call<Void> callInvitation = API.get().sendInvitation(partner.getUsername(), username,
                                        userServerAddress, username);
        callInvitation.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                int code =response.code();
                if((int)(code/100) != 2){
                    Log.i("ChatRepository", "onResponse - Failure on POST /api/invitations, code: "+ code);
                } else{
                    Log.i("ChatRepository", "Success on POST /api/invitations");
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.i("ChatRepository", "Failure on POST /api/invitations");
            }
        });
    }

    public void delete(Chat chat, Partner partner){
        new DeleteChatAsyncTask(chatDao).execute(chat);
        new DeletePartnerAsyncTask(partnerDao).execute(partner);
        chats.getValue().remove(chat);     // Check if the list has been updated!
        // Add a DELETE request /api/contacts/{id}
        Call<Void> callDeleteContact = API.get().deleteContact(username, partner.getUsername());
        callDeleteContact.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                int code =response.code();
                if((int)(code/100) != 2){
                    Log.i("ChatRepository", "onResponse - Failure on DELETE /api/contacts/{id}, code: "+ code);
                } else{
                    Log.i("ChatRepository", "Success on DELETE /api/contacts/{id}");
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.i("ChatRepository", "Failure on DELETE /api/contacts/{id}");
            }
        });
    }

    public LiveData<List<Chat>> getUserChats(){
        return chats;
    }

    /**
     *  Add validation functions:
        * Chat already exists - by userID and partnerID
        * Can't add yourself
     */

    // Inner class for chat insert async task to the Dao
    private static class InsertChatAsyncTask extends AsyncTask<Chat, Void, Void>{
        private ChatDao chatDao;


        private InsertChatAsyncTask(ChatDao chatDao){
            this.chatDao = chatDao;
        }

        @Override
        protected Void doInBackground(Chat... chat){
            chatDao.insert(chat[0]);
            return null;
        }
    }

    // Inner class for Partner insert async task to the Dao
    private static class InsertPartnerAsyncTask extends AsyncTask<Partner, Void, Void>{
        private final PartnerDao partnerDao;


        private InsertPartnerAsyncTask(PartnerDao partnerDao){
            this.partnerDao = partnerDao;
        }

        @Override
        protected Void doInBackground(Partner... partner){
            partnerDao.insert(partner[0]);
            return null;
        }
    }

    // Inner class for delete async task from the Dao
    private static class DeleteChatAsyncTask extends AsyncTask<Chat, Void, Void>{
        private final ChatDao chatDao;

        private DeleteChatAsyncTask(ChatDao chatDao){
            this.chatDao = chatDao;
        }

        @Override
        protected Void doInBackground(Chat... chat){
            chatDao.delete(chat[0]);
            return null;
        }
    }

    // Inner class for delete task from the Dao
    private static class DeletePartnerAsyncTask extends AsyncTask<Partner, Void, Void>{
        private final PartnerDao partnerDao;

        private DeletePartnerAsyncTask(PartnerDao dao){
            this.partnerDao = dao;
        }

        @Override
        protected Void doInBackground(Partner... Partner){
            partnerDao.delete(Partner[0]);
            return null;
        }
    }

}

