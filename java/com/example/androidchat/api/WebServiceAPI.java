package com.example.androidchat.api;

import com.example.androidchat.entities.*;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface WebServiceAPI {
    @GET("contacts")
    Call<List<Partner>> getAllContacts(String currentUser);

    @POST("contacts")
    Call<Void> addContact(String currentUser, @Body Partner partner);

    @GET("contacts/{id}")
    Call<Partner> get(String currentUser, @Path("id") String partnerUsername);

    @PUT("contacts/{id}")
    Call<Void> editContact(String currentUser, @Path("id") String partnerUsername, @Body Partner partner);

    @DELETE("contacts/{id}")
    Call<Void> deleteContact(String currentUser, @Path("id") String partnerUsername);

    @GET("contacts/{id}/messages")
    Call<List<Message>> getMessages(String currentUser, @Path("id") String partnerUsername);

    @POST("contacts/{id}/messages")
    Call<Void> addMessage(String currentUser, @Path("id") String partnerUsername, @Body String data);

    @GET("contacts/{id}/messages/{id2}")
    Call<List<Message>> getMessageByID(String currentUser, @Path("id") String partnerUsername, @Path("id2") String messageID);

    @PUT("contacts/{id}/messages/{id2}")
    Call<List<Message>> editMessageByID(String currentUser, @Path("id") String partnerUsername, @Path("id2") String messageID, String data);

    @DELETE("contacts/{id}/messages/{id2}")
    Call<List<Message>> deleteMessageByID(String currentUser, @Path("id") String partnerUsername, @Path("id2") String messageID);

    @GET("chats")
    Call<List<Chat>> getUserChats(String currentUser);

    /****** Invitation ******/
    @POST("invitations")
    Call<Void> sendInvitation(String currentUser, @Body String partner,@Body String serverAddress,@Body String nickname);

    @POST("invitations")
    Call<Void> sendInvitation(String currentUser,@Body String partner,@Body String serverAddress);

    /****** Transfer ******/
    @POST("transfer")
    Call<Void> trasnferMessage(String currentUser, String partner,@Body String data);

    /****** Login/Register ******/
    @Headers({"Accept: application/json"})
    @GET("login")
//    Call<Boolean> checkLogin(@Body User user);
    Call<Boolean> checkLogin(@Query("username") String username, @Query("password") String password);

    @POST("register")
    Call<Void> register(@Body User user);
}
