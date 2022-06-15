package com.example.androidchat.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.androidchat.R;
import com.example.androidchat.entities.Chat;

import java.util.List;

public class ChatListAdapter extends ArrayAdapter<Chat> {
    private LayoutInflater mInflater;
    public ChatListAdapter(Context context, List<Chat> chats) {
        super(context, R.layout.chat_item, chats);
        this.mInflater = LayoutInflater.from(context);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Chat c = getItem(position);
        if (convertView == null) {
            convertView = mInflater.inflate(R.layout.chat_item, parent, false);
        }
        TextView partnerID = convertView.findViewById(R.id.chat_partnerID);
        TextView lastMessage = convertView.findViewById(R.id.chat_lastMsg);
        TextView time = convertView.findViewById(R.id.chat_lastMsg_time);
        partnerID.setText(c.getPartnerID());
        // need to add last message reference
//        lastMessage.setText(c.getLastMessage());
//        time.setText(c.getLastMessageDate());
        return convertView;
    }
}