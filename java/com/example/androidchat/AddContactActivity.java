package com.example.androidchat;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

public class AddContactActivity extends AppCompatActivity {
    private String loggedUser;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_contact);
        Intent i = getIntent();
        this.loggedUser = i.getStringExtra("username");
        // need to create ref to repo

        Button addBtn = findViewById(R.id.add_submitBtn);
        addBtn.setOnClickListener( view -> {
            EditText partnerName = findViewById(R.id.add_Username);
            EditText partnerNickname = findViewById(R.id.add_Nickname);
            EditText partnerAddress = findViewById(R.id.add_Server);
            // logic to validate partner send - handle error and start again
            // logic to add partner and chat accordingly
            finish();
        });

    }
}
