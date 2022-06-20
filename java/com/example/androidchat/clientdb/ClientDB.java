package com.example.androidchat.clientdb;

import android.content.Context;

import androidx.room.AutoMigration;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.migration.Migration;
import androidx.sqlite.db.SupportSQLiteDatabase;

import com.example.androidchat.daos.ChatDao;
import com.example.androidchat.daos.MessageDao;
import com.example.androidchat.daos.PartnerDao;
import com.example.androidchat.daos.UserDao;
import com.example.androidchat.entities.*;

import java.io.Serializable;

@Database(entities = {User.class, Chat.class, Message.class, Partner.class}, version = 2)
public abstract class ClientDB extends RoomDatabase{
    public static ClientDB instance;

    public abstract UserDao userDao();
    public abstract ChatDao chatDao();
    public abstract MessageDao messageDao();
    public abstract PartnerDao partnerDao();

    public static ClientDB getInstance(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context, ClientDB.class, "ClientDB")
                    .allowMainThreadQueries().addMigrations(MIGRATION_1_2)
                    .build();
        }
        return instance;
    }

    static final Migration MIGRATION_1_2 = new Migration(1, 2) {
        @Override
        public void migrate(SupportSQLiteDatabase database) {
            database.execSQL("CREATE TABLE `Chat` (`ID` Text, " + "`UserID` TEXT, "+
                                "`PartnerID` TEXT, "+" PRIMARY KEY(`ID`))");

            database.execSQL("CREATE TABLE `Message` (`ID` Text, " + "`Author` TEXT, "+
                    "`Time` TEXT, "+"`Data` TEXT, "+"`Type` TEXT, "+"`ChatID` TEXT, "+
                    " PRIMARY KEY(`ID`))");
        }
    };
}
