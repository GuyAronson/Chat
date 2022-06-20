package com.example.androidchat.daos;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;

import com.example.androidchat.entities.Chat;

import java.io.Serializable;
import java.util.List;

@Dao
public interface ChatDao{

    @Query("SELECT * FROM Chat")
    List<Chat> getAll();

    @Query("SELECT * FROM Chat WHERE id = :id")
    Chat get(String id);

    @Query("SELECT * FROM Chat WHERE userID = :username")
    List<Chat> getUserChats(String username);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insert(Chat chat);

    @Update
    void update(Chat chat);

    @Delete
    void delete(Chat chat);

    @Query("DELETE FROM Chat")
    public void clearTable();
}
