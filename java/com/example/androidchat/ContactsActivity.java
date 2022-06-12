package com.example.androidchat;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

public class ContactsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contacts);

        String username = getIntent().getStringExtra("username");
        TextView msg = findViewById(R.id.hello);
        msg.setText("Hello " + username);
    }
}