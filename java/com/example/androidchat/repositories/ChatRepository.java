package com.example.androidchat.repositories;

import android.app.Application;
import android.os.AsyncTask;

import androidx.lifecycle.LiveData;

import com.example.androidchat.api.API;
import com.example.androidchat.clientdb.ClientDB;
import com.example.androidchat.daos.ChatDao;
import com.example.androidchat.daos.PartnerDao;
import com.example.androidchat.entities.Chat;
import com.example.androidchat.entities.Partner;
import java.util.List;

import retrofit2.Call;

public class ChatRepository {
    private ChatDao chatDao;
    private PartnerDao partnerDao;
    private LiveData<List<Chat>> chats;
    private ClientDB db;
    private API api;

    ChatRepository(Application application, String username){
        db = ClientDB.getInstance(application);
        partnerDao = db.partnerDao();
        chatDao = db.chatDao();
        Call<List<Chat>> call = api.get().getUserChats(username);
        chats = chatDao.getUserChats(username);
    }

    public void insert(Chat chat, Partner partner){
        new InsertChatAsyncTask(chatDao).execute(chat);
        new InsertPartnerAsyncTask(partnerDao).execute(partner);
        chats.getValue().add(chat);     // Check if the list has been updated!
        // Need to add invitation Request
    }

    public void delete(Chat chat, Partner partner){
        new DeleteChatAsyncTask(chatDao).execute(chat);
        new DeletePartnerAsyncTask(partnerDao).execute(partner);
        chats.getValue().remove(chat);     // Check if the list has been updated!
    }

    public LiveData<List<Chat>> getUserChats(){
        return chats;
    }

    /**
     *  Add validation functions:
        * Chat already exists - by userID and partnerID
        * Can't add yourself
     */

    // Inner class for chat insert task
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

    // Inner class for Partner insert task
    private static class InsertPartnerAsyncTask extends AsyncTask<Partner, Void, Void>{
        private PartnerDao partnerDao;


        private InsertPartnerAsyncTask(PartnerDao partnerDao){
            this.partnerDao = partnerDao;
        }

        @Override
        protected Void doInBackground(Partner... partner){
            partnerDao.insert(partner[0]);
            return null;
        }
    }

    // Inner class for delete task
    private static class DeleteChatAsyncTask extends AsyncTask<Chat, Void, Void>{
        private ChatDao chatDao;

        private DeleteChatAsyncTask(ChatDao chatDao){
            this.chatDao = chatDao;
        }

        @Override
        protected Void doInBackground(Chat... chat){
            chatDao.delete(chat[0]);
            return null;
        }
    }

    // Inner class for delete task
    private static class DeletePartnerAsyncTask extends AsyncTask<Partner, Void, Void>{
        private PartnerDao partners;

        private DeletePartnerAsyncTask(PartnerDao partner){
            this.partners = partner;
        }

        @Override
        protected Void doInBackground(Partner... Partner){
            partners.delete(Partner[0]);
            return null;
        }
    }

}

