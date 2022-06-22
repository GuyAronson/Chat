package com.example.androidchat.api;

import com.example.androidchat.R;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

//Singleton
public class API {
    private static Retrofit retrofit = null;
    private static WebServiceAPI api = null;
    public final static String myServerAddress = ChatApp.context.getString(R.string.serverAddress);
    public final static String myApiUrl = ChatApp.context.getString(R.string.apiUrl);

    public static Retrofit getRetrofit(){
        if(retrofit == null){
            // Creating retrofit object for creating the API - with the localhost url
            retrofit = new Retrofit.Builder().baseUrl(myApiUrl)
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

    public static WebServiceAPI set(String serverUrl){
        String url = serverUrl.replace("https", "http");
        if(serverUrl.charAt(serverUrl.length()-1) == '/')
                url += "api/";
        else    url += "/api/";
        Retrofit tempRetrofit = new Retrofit.Builder().baseUrl(url)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        return tempRetrofit.create(WebServiceAPI.class);
    }
}
