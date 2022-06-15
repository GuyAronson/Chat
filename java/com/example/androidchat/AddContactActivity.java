package com.example.androidchat;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.example.androidchat.entities.Partner;
import com.example.androidchat.viewmodels.ContactsViewModel;
import com.example.androidchat.viewmodels.ContactsViewModelFactory;

public class AddContactActivity extends AppCompatActivity {
    private String loggedUser;
    private ContactsViewModel contactsVM;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_contact);
        Intent i = getIntent();
        this.loggedUser = i.getStringExtra("username");
        this.contactsVM = new ViewModelProvider(this,
                new ContactsViewModelFactory(this.loggedUser, getApplicationContext()))
                .get(ContactsViewModel.class);
        Button addBtn = findViewById(R.id.add_submitBtn);
        addBtn.setOnClickListener( view -> {
            EditText partnerName = findViewById(R.id.add_Username);
            EditText partnerNickname = findViewById(R.id.add_Nickname);
            EditText partnerAddress = findViewById(R.id.add_Server);
            String name = partnerName.getText().toString();
            String address = partnerAddress.getText().toString();
            String nickname;
            if (!partnerNickname.getText().toString().isEmpty()) {
                nickname = partnerNickname.getText().toString();
            } else {
                nickname = null;
            }
            Partner p = new Partner(name,nickname, address);
            contactsVM.add(p);
            finish();
        });

    }
}
