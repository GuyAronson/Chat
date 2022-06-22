package com.example.androidchat.daos;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;

import com.example.androidchat.entities.Message;

import java.util.List;

@Dao
public interface MessageDao {

    @Query("SELECT * FROM Message")
    List<Message> getAll();

    @Query("SELECT * FROM Message WHERE ID = :id")
    Message get(String id);

    @Query("SELECT * FROM Message WHERE ChatID = :chatid")
    List<Message> getFromChat(String chatid);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insert(Message message);

    @Update
    void update(Message message);

    @Delete
    void delete(Message message);

    @Query("DELETE FROM Message")
    public void clearTable();
}
