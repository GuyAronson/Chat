package com.example.androidchat;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.androidchat.viewmodels.ErrorMsgViewModel;

public class RegisterActivity extends AppCompatActivity {

    private ErrorMsgViewModel errorViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        // Error message live data
        errorViewModel =  new ViewModelProvider(this).get(ErrorMsgViewModel.class);
        errorViewModel.getErrorMsg().observe(this, s -> {
            TextView error = findViewById(R.id.textView_error_msg);
            error.setText(s);
        });


        Button register = findViewById(R.id.btnRegister);
        register.setOnClickListener(v ->{
            EditText username = findViewById(R.id.register_et_username);
            EditText password = findViewById(R.id.register_et_password);
            EditText confirmPassword = findViewById(R.id.register_et_passwordConfirm);
            boolean result = inputValidations(username.getText().toString(), password.getText().toString(),
                                                confirmPassword.getText().toString());
            if(result)
                Log.i("RegisterActivity","Register is VALID.");
            else    Log.i("RegisterActivity","Register is INVALID.");
        });

        Button login = findViewById(R.id.btnLogin);
        login.setOnClickListener(v->{
            Intent i = new Intent(this, Login.class);
            startActivity(i);
        });
    }

    private boolean inputValidations(String username, String password, String secondPassword){
        if(username == null || username == ""){
            errorViewModel.setErrorMsg("Invalid Username");
            return false;
        }
        if(password != secondPassword) {
            errorViewModel.setErrorMsg("Passwords don't match!");
            return false;
        }
        return true;
    }
}