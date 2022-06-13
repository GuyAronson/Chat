package com.example.androidchat;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.androidchat.api.API;
import com.example.androidchat.entities.User;
import com.example.androidchat.viewmodels.ErrorMsgViewModel;

import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {

    private ErrorMsgViewModel errorViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        // Error message live data
        errorViewModel =  new ViewModelProvider(this).get(ErrorMsgViewModel.class);
        errorViewModel.getErrorMsg().observe(this, s -> {
//            getSupportActionBar().setTitle(s);
            TextView error = findViewById(R.id.textView_error_msg);
            error.setText(s);
            error.setVisibility(View.VISIBLE);
        });

        Button register = findViewById(R.id.btnRegister);
        register.setOnClickListener(v ->{
            EditText et_username = findViewById(R.id.register_et_username);
            EditText et_nickname = findViewById(R.id.register_et_nickname);
            EditText et_password = findViewById(R.id.register_et_password);
            EditText et_confirmPassword = findViewById(R.id.register_et_passwordConfirm);
            String username = et_username.getText().toString();
            String nickname = et_nickname.getText().toString();
            String password = et_password.getText().toString();
            String confirmPassword = et_confirmPassword.getText().toString();
            boolean result = inputValidations(username, password, confirmPassword);

            /**************************************************************************
             * fetch all the user's data to the Daos
             *************************************************************************/
            if(result) {
                Log.i("RegisterActivity", "Register is VALID.");

//                Call<Void> call = API.get().register(new User(username, nickname, password));
                Call<Void> call = API.get().register(username, nickname, password);
                call.enqueue(new Callback<Void>() {
                    @Override
                    public void onResponse(Call<Void> call, Response<Void> response) {
                        Log.i("RegisterResponse", response.message());
                        Log.i("RegisterResponse_code", Integer.toString(response.code()));
                        if(response.code() != 200){
                            errorViewModel.setErrorMsg("Bad Request");
                        } else {
                            Intent contactsIntent = new Intent(getApplicationContext(), ContactsActivity.class);
                            contactsIntent.putExtra("username", username);
                            startActivity(contactsIntent);
                        }
                    }

                    @Override
                    public void onFailure(Call<Void> call, Throwable t) {
                        Log.i("RegisterFailure", t.getMessage());
                        errorViewModel.setErrorMsg("Bad Request");
                    }
                });
            }
            else    Log.i("RegisterActivity","Register is INVALID.");
        });

        Button login = findViewById(R.id.btnLogin);
        login.setOnClickListener(v->{
            Intent i = new Intent(this, Login.class);
            startActivity(i);
        });
    }

    private boolean inputValidations(String username, String password, String secondPassword){
        if(username == null || username.equals("")){
            errorViewModel.setErrorMsg("Invalid Username");
            return false;
        }
        if(password == null || password.equals("")){
            errorViewModel.setErrorMsg("Invalid Password");
            return false;
        }
        if(!password.equals(secondPassword)) {
            errorViewModel.setErrorMsg("Passwords don't match!");
            return false;
        }
        return true;
    }
}