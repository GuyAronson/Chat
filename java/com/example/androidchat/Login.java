package com.example.androidchat;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;

import com.example.androidchat.api.AuthAPI;

import java.io.IOException;

public class Login extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        AuthAPI authAPI = new AuthAPI();

        Button btnLogin = findViewById(R.id.btnLogin);
        btnLogin.setOnClickListener(v -> {
            EditText et_username = findViewById(R.id.editTextUsername);
            EditText et_password = findViewById(R.id.editTextPassword);
            try {
                if(authAPI.checkLogin(et_username.getText().toString(), et_password.getText().toString()))
                    Log.i("Login","TRUE");
                else    Log.i("Login","FALSE");
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        Button btnRegister = findViewById(R.id.btnRegister);
        btnRegister.setOnClickListener(v ->{
            Intent intent = new Intent(this, RegisterActivity.class);
            startActivity(intent);
        });
    }
}