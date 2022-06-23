package com.example.androidchat;

import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidchat.adapters.MessagesAdapter;
import com.example.androidchat.entities.Chat;
import com.example.androidchat.entities.Message;
import com.example.androidchat.entities.Partner;
import com.example.androidchat.viewmodels.ContactsViewModel;
import com.example.androidchat.viewmodels.ContactsViewModelFactory;
import com.example.androidchat.viewmodels.MessagesViewModel;
import com.example.androidchat.viewmodels.MessagesViewModelFactory;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;

public class ChatRoomActivity extends AppCompatActivity {
    private List<Message> messages;
    private String loggedUser;
    private Partner partner;
    private String chatID;
    private MessagesViewModel messagesVM;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_room);

        Intent i = getIntent();
        this.loggedUser = i.getStringExtra("username");
        String partnerName = i.getStringExtra("partner");
        this.chatID = i.getStringExtra("chatID");


        // Setting the current user
        this.messagesVM = new ViewModelProvider(this,
                new MessagesViewModelFactory(this.loggedUser,partnerName,this.chatID, getApplicationContext()))
                .get(MessagesViewModel.class);
        this.messages = messagesVM.getAll().getValue();

        Partner p = messagesVM.getPartner(partnerName);
        TextView userTitle = findViewById(R.id.chatRm_user);
        if (p != null) {
            this.partner = p;
            if(p.getNickname() != null)
                userTitle.setText(p.getNickname());
            else
                userTitle.setText(partnerName);
        } else{
            userTitle.setText(partnerName);
        }

        RecyclerView chatRecyclerView = findViewById(R.id.chatRm_msgs);
        // set last msg
        LinearLayoutManager viewManager = new LinearLayoutManager(this);
        viewManager.setStackFromEnd(true);
        chatRecyclerView.setLayoutManager(viewManager);
        MessagesAdapter adapter = new MessagesAdapter(this, this.messages, this.loggedUser,
                partnerName);
        chatRecyclerView.setAdapter(adapter);

        this.messagesVM.getAll().observe(this, msgs -> {
            this.messages.clear();
            int len = msgs.toArray().length;

            for (int j = 0; j < len; j++) {
                Message m = msgs.get(j);
                if(m.getID()!= null && m.getData()!= null && m.getTime() != null
                        && m.getChatID() != null && m.getAuthor()!= null)
                {
                    if (m.getTime() != null && m.getTime().length() > 5) {
                        String time = m.getTime();
                        int k = time.indexOf(':');
                        String hour = time.substring(k-2, k+3);
                        m.setTime(hour);
                    }
                    this.messages.add(m);
                }
            }
            adapter.notifyDataSetChanged();
        });
        chatRecyclerView.setVisibility(View.VISIBLE);

        FloatingActionButton sendBtn = findViewById(R.id.chatRm_sendBtn);
        sendBtn.setOnClickListener(v -> {
            EditText input = findViewById(R.id.chatRM_input);
            String data = input.getText().toString();
            Message msg = new Message(loggedUser, data,"text",chatID);
            input.setText("");
            messagesVM.add(msg, partner);
        });

    }
}
