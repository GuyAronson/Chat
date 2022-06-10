package com.example.androidchat.clientdb;

import androidx.room.Database;
import androidx.room.RoomDatabase;

import com.example.androidchat.daos.ChatDao;
import com.example.androidchat.daos.MessageDao;
import com.example.androidchat.daos.PartnerDao;
import com.example.androidchat.entities.*;

@Database(entities = {Chat.class, Message.class, Partner.class}, version = 1)
public abstract class ClientDB extends RoomDatabase{
    public abstract ChatDao chatDao();
    public abstract MessageDao messageDao();
    public abstract PartnerDao partnerDao();
}
