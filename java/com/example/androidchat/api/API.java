package com.example.androidchat.api;

import com.example.androidchat.R;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

//Singleton
public class API {
    private static Retrofit retrofit = null;
    private static WebServiceAPI api = null;

    public static Retrofit getRetrofit(){
        if(retrofit == null){
            retrofit = new Retrofit.Builder().baseUrl(ChatApp.context.getString(R.string.apiUrl))
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
            api = retrofit.create(WebServiceAPI.class);
        }
        return retrofit;
    }

    public static WebServiceAPI get(){
        if(api == null){
            getRetrofit();
        }
        return api;
    }
}
