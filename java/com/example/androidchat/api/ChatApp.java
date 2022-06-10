package com.example.androidchat.api;

import android.app.Application;
import android.content.Context;

public class ChatApp extends Application {
    public static Context context;

    @Override
    public void onCreate(){
        super.onCreate();
        context = getApplicationContext();
    }
}
