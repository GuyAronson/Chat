package com.example.androidchat;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidchat.adapters.MessagesAdapter;
import com.example.androidchat.entities.Message;

import java.util.ArrayList;

public class ChatRoomActivity extends AppCompatActivity {
    private ArrayList<Message> messages;
    private String loggedUser;
    private String partnerID;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_room);
        Intent i = getIntent();
        this.loggedUser = i.getStringExtra("username");
        this.partnerID = i.getStringExtra("partner");
        // add logic to recive all messages;
        // add ref to relevant repo
        RecyclerView chatRecyclerView = findViewById(R.id.chatRm_msgs);
        // set last msg
        LinearLayoutManager viewManager = new LinearLayoutManager(this);
        viewManager.setStackFromEnd(true);
        chatRecyclerView.setLayoutManager(viewManager);
        MessagesAdapter adapter = new MessagesAdapter(this, this.messages, this.loggedUser,
                this.partnerID);
    }
}