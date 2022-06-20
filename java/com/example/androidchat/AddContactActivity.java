package com.example.androidchat;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.example.androidchat.entities.Partner;
import com.example.androidchat.repositories.ContactsRepository;
import com.example.androidchat.viewmodels.ContactsViewModel;
import com.example.androidchat.viewmodels.ContactsViewModelFactory;

public class AddContactActivity extends AppCompatActivity {
    private String loggedUser;
    private ContactsRepository contactsRepo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_contact);
        Intent i = getIntent();
        this.loggedUser = i.getStringExtra("username");

        Button addBtn = findViewById(R.id.add_submitBtn);
        addBtn.setOnClickListener( view -> {
            EditText partnerName = findViewById(R.id.add_Username);
            EditText partnerNickname = findViewById(R.id.add_Nickname);
            EditText partnerAddress = findViewById(R.id.add_Server);
            String name = partnerName.getText().toString();
            String address = partnerAddress.getText().toString();
            String nickname;
            if(name.equals(loggedUser))
                return;
            if (!partnerNickname.getText().toString().isEmpty()) {
                nickname = partnerNickname.getText().toString();
            } else {
                nickname = name;
            }

            Intent data = new Intent();
            data.putExtra("new_contact_username", name);
            data.putExtra("new_contact_nickname", nickname);
            data.putExtra("new_contact_server_address", address);
            // Activity finished return ok, return the data
            setResult(Activity.RESULT_OK, data);
            finish();
        });

    }
}
