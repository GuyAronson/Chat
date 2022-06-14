package com.example.androidchat.clientdb;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import com.example.androidchat.daos.ChatDao;
import com.example.androidchat.daos.MessageDao;
import com.example.androidchat.daos.PartnerDao;
import com.example.androidchat.daos.UserDao;
import com.example.androidchat.entities.*;

@Database(entities = {User.class, Chat.class, Message.class, Partner.class}, version = 1)
public abstract class ClientDB extends RoomDatabase{
    private static ClientDB instance = null;

    public abstract UserDao userDao();
    public abstract ChatDao chatDao();
    public abstract MessageDao messageDao();
    public abstract PartnerDao partnerDao();

    public static synchronized ClientDB getInstance(Context context){
        if(instance == null){
            instance = Room.databaseBuilder(context.getApplicationContext(), ClientDB.class, "client_database")
                    .fallbackToDestructiveMigration()
                    .build();
        }
        return instance;
    }
}
