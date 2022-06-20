package com.example.androidchat;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Parcelable;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.example.androidchat.adapters.ChatListAdapter;
import com.example.androidchat.entities.Chat;
import com.example.androidchat.entities.Partner;
import com.example.androidchat.viewmodels.ContactsViewModel;
import com.example.androidchat.viewmodels.ContactsViewModelFactory;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;

public class ContactsActivity extends AppCompatActivity {
    private List<Chat> chats;
    private ContactsViewModel contactsVM;
    private String loggedUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contacts);

        // Setting up result for the add contact activity
        ActivityResultLauncher<Intent> addContactActivityResultLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                new ActivityResultCallback<ActivityResult>() {
                    @Override
                    public void onActivityResult(ActivityResult result) {
                        if (result.getResultCode() == Activity.RESULT_OK) {
                            Intent data = result.getData();
                            if (data != null && data.hasExtra("new_contact_username") &&
                                    data.hasExtra("new_contact_nickname") &&
                                    data.hasExtra("new_contact_server_address")) {

                                // Add the partner to the LiveData & DAO & API
                                String name = data.getStringExtra("new_contact_username");
                                String nickname = data.getStringExtra("new_contact_nickname");
                                String server = data.getStringExtra("new_contact_server_address");
                                contactsVM.add(new Partner(name,nickname, server));
                            }
                        }
                    }
                });

        // Get the logged user
        Intent i = getIntent();
        TextView loggedUser = findViewById(R.id.logged_in_user);
         this.loggedUser = i.getStringExtra("username");
        String prompt = "Hello " + this.loggedUser + "!";
        loggedUser.setText(prompt);

        // Setting the current user
        this.contactsVM = new ViewModelProvider(this,
                new ContactsViewModelFactory(this.loggedUser, getApplicationContext()))
                .get(ContactsViewModel.class);
        this.chats = contactsVM.getAll().getValue();

        // Setting up the user chats - getting from the view model and the repository
        ListView lvChats = findViewById(R.id.chat_list);
        lvChats.setClickable(true);
        ChatListAdapter adapter = new ChatListAdapter(getApplicationContext(), chats);
        lvChats.setAdapter(adapter);
        this.contactsVM.getAll().observe(this, chats -> {
            this.chats.clear();
            this.chats.addAll(chats);
            adapter.notifyDataSetChanged();
        });
        lvChats.setVisibility(View.VISIBLE);

        // Add contact button
        FloatingActionButton addBtn = findViewById(R.id.addContactButton);
        addBtn.setOnClickListener( view -> {
            Intent addContactIntent = new Intent(this, AddContactActivity.class);
            addContactIntent.putExtra("username", this.loggedUser);
            addContactActivityResultLauncher.launch(addContactIntent);
        });

        // Click on chat
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
