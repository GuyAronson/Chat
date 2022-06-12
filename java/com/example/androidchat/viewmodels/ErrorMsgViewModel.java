package com.example.androidchat.viewmodels;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class ErrorMsgViewModel extends ViewModel {
    private MutableLiveData<String> errorMsg;

    public MutableLiveData<String> getErrorMsg() {
        if(errorMsg == null){
            errorMsg = new MutableLiveData<String>();
        }
        return errorMsg;
    }

    public void setErrorMsg(String msg) {
        getErrorMsg().postValue(msg);
    }
}
