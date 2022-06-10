package com.example.androidchat;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

public class RegisterActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        Button login = findViewById(R.id.btnLogin);
        login.setOnClickListener(v->{
            Intent i = new Intent(this, Login.class);
            startActivity(i);
        });
    }
}