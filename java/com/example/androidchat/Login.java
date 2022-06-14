package com.example.androidchat;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.androidchat.api.API;
import com.example.androidchat.api.ChatApp;

import org.w3c.dom.Text;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Login extends AppCompatActivity {

    protected void onCreate(String errMsg) {
        getIntent().putExtra("errorMsg", errMsg);
        recreate();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        TextView error = findViewById(R.id.textView_error_msg);
        String errorMsg = getIntent().getStringExtra("errorMsg");
        if(errorMsg != null){
            error.setText(errorMsg);
            error.setVisibility(View.VISIBLE);
        }

        Button btnLogin = findViewById(R.id.btnLogin);
        btnLogin.setOnClickListener(v -> {
            error.setVisibility(View.INVISIBLE);

            EditText et_username = findViewById(R.id.editTextUsername);
            EditText et_password = findViewById(R.id.editTextPassword);

            /**
             * Access to the DB should not be from an activity in the Client-side - consider changing it
             */
            Call<Boolean> call = API.get().checkLogin(et_username.getText().toString(),
                                                        et_password.getText().toString());
            call.enqueue(new Callback<Boolean>() {
                @Override
                public void onResponse(Call<Boolean> call, Response<Boolean> response) {
                    Log.i("Login", response.body().toString());
                    Intent contactsIntent =  new Intent(getApplicationContext(), ContactsActivity.class);
                    contactsIntent.putExtra("username", et_username.getText().toString());
                    startActivity(contactsIntent);
                }

                @Override
                public void onFailure(Call<Boolean> call, Throwable t) {
                    Log.i("Login", t.getMessage());

                    getIntent().putExtra("errorMsg", "Wrong username or password!");
                    recreate();
                }
            });
            //....
        });
        Button btnRegister = findViewById(R.id.btnRegister);
        btnRegister.setOnClickListener(v ->{
            error.setVisibility(View.INVISIBLE);

            Intent intent = new Intent(this, RegisterActivity.class);
            startActivity(intent);
        });
    }
}