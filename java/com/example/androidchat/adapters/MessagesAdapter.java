package com.example.androidchat.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidchat.R;
import com.example.androidchat.entities.Message;

import java.util.ArrayList;

public class MessagesAdapter extends RecyclerView.Adapter {
    private Context context;
    private ArrayList<Message> messages;
    private String loggedUser;
    private String partnerID;
    private static int USER_MSG = 1;
    private static int PARTNER_MSG = 2;

    public MessagesAdapter(Context context, ArrayList<Message> messages, String loogedUser,
                           String partnerID) {
        this.context = context;
        this.messages = messages;
        this.loggedUser = loogedUser;
        this.partnerID = partnerID;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == USER_MSG) {
            View view = LayoutInflater.from(context).inflate(R.layout.user_msg_layout, parent, false);
            return new UserMessageHolder(view);
        } else { // partner message
            View view = LayoutInflater.from(context).inflate(R.layout.partner_msg_layout, parent, false);
            return new PartnerMessageHolder(view);
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        Message msg = messages.get(position);
        if (holder.getClass() == UserMessageHolder.class) {
            UserMessageHolder temp = (UserMessageHolder) holder;
            temp.msgData.setText(msg.getData());
            temp.msgTime.setText(msg.getTime());
        } else { // partner message holder
            PartnerMessageHolder temp = (PartnerMessageHolder) holder;
            temp.msgData.setText(msg.getData());
            temp.msgTime.setText(msg.getTime());
        }
    }

    @Override
    public int getItemCount() {
        return messages.size();
    }

    @Override
    public int getItemViewType(int position) {
        Message msg = messages.get(position);
        if (msg.getAuthor().equals(this.loggedUser)) {
            return USER_MSG;
        } else {
            return PARTNER_MSG;
        }
    }

    // private view holders to match msg type
    class UserMessageHolder extends RecyclerView.ViewHolder {
        TextView msgData;
        TextView msgTime;
        public UserMessageHolder(@NonNull View itemView) {
            super(itemView);
            msgData = itemView.findViewById(R.id.usrMsg_data);
            msgTime = itemView.findViewById(R.id.usrMsg_time);
        }
    }
    class PartnerMessageHolder extends RecyclerView.ViewHolder {
        TextView msgData;
        TextView msgTime;

        public PartnerMessageHolder(@NonNull View itemView) {
            super(itemView);
            msgData = itemView.findViewById(R.id.partnerMsg_data);
            msgTime = itemView.findViewById(R.id.partnerMsg_time);
        }
    }

}
