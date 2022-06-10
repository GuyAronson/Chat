package com.example.androidchat;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button login = findViewById(R.id.btnLogin);
        login.setOnClickListener(v->{
//            Log.i("Login", "Login clicked!");
            Intent i = new Intent(this, Login.class);
            startActivity((i));
        });

        Button register = findViewById(R.id.btnRegister);
        register.setOnClickListener(v->{
//            Log.i("RegisterActivity", "Register clicked!");
            Intent i = new Intent(this, RegisterActivity.class);
            startActivity((i));
        });
    }
}