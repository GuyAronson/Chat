package com.example.androidchat.api;

import com.example.androidchat.R;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class AuthAPI {
    Retrofit retrofit;
    WebServiceAPI api;

    public AuthAPI(){
        retrofit = new Retrofit.Builder().baseUrl(ChatApp.context.getString(R.string.apiUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        api = retrofit.create(WebServiceAPI.class);
    }

    public boolean checkLogin(String username, String password) throws IOException {
        Call<Boolean> call = api.checkLogin(username, password);
        Response<Boolean> res = call.execute();
        return Boolean.TRUE.equals(res.body());
    }
}
