package com.example.androidchat;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.example.androidchat.adapters.ChatListAdapter;
import com.example.androidchat.entities.Chat;
import com.example.androidchat.viewmodels.ContactsViewModel;
import com.example.androidchat.viewmodels.ContactsViewModelFactory;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;

public class ContactsActivity extends AppCompatActivity {
    private List<Chat> chats = new ArrayList<>();
    private ContactsViewModel contactsVM;
    private String loggedUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // need to create repo ref in order to retrive user data
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contacts);
        Intent i = getIntent();
        TextView loggedUser = findViewById(R.id.logged_in_user);
         this.loggedUser = i.getStringExtra("username");
        String prompt = "Hello " + this.loggedUser + "!";
        // Setting the current user
        this.contactsVM = new ViewModelProvider(this,
                new ContactsViewModelFactory(this.loggedUser, getApplicationContext()))
                .get(ContactsViewModel.class);
        loggedUser.setText(prompt);
        this.chats = contactsVM.getAll().getValue();
        // need to add the chats of the user
        ListView lvChats = findViewById(R.id.chat_list);
        lvChats.setClickable(true);
        ChatListAdapter adapter = new ChatListAdapter(getApplicationContext(), chats);
        lvChats.setAdapter(adapter);
        this.contactsVM.getAll().observe(this, chats -> {
            adapter.notifyDataSetChanged();
            this.chats = chats;
        });
        lvChats.setVisibility(View.VISIBLE);
        FloatingActionButton addBtn = findViewById(R.id.addContactButton);
        addBtn.setOnClickListener( view -> {
            Intent addContactIntent = new Intent(this, AddContactActivity.class);
            addContactIntent.putExtra("username", this.loggedUser);
            startActivity(addContactIntent);
        });
        // add logic for clicking on chat
        lvChats.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    // send to the chats activity the username and the
                Chat c = chats.get(position);
                Intent chatRoomIntent = new Intent(getApplicationContext(), ChatRoomActivity.class);
                chatRoomIntent.putExtra("username", c.getUserID());
                chatRoomIntent.putExtra("partner", c.getPartnerID());
                startActivity(chatRoomIntent);
            }
        });

    }

    @Override
    protected void onResume() {
        super.onResume();

    }
}
