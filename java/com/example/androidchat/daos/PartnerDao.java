package com.example.androidchat.daos;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.example.androidchat.entities.Partner;

import java.util.List;

@Dao
public interface PartnerDao {

    @Query("SELECT * FROM Partner")
    List<Partner> getAll();

    @Query("SELECT * FROM Partner WHERE Username = :username")
    Partner get(String username);

    @Insert
    void insert(Partner partner);

    @Update
    void update(Partner partner);

    @Delete
    void delete(Partner partner);

    @Query("DELETE FROM Partner")
    public void clearTable();
}
