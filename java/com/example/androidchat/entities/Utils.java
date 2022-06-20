package com.example.androidchat.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Utils {
    public static String GenerateRandomID()
    {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        final int IDlength = 8;
        String id = "";
        Random rnd = new Random();

        for (int i = 0; i < IDlength; i++)
        {
            int index = rnd.nextInt(chars.length()-1);
            id += chars.charAt(index);
        }

        return id;
    }
}
