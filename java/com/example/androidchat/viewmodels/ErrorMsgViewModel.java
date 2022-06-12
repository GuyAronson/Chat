package com.example.androidchat.viewmodels;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class ErrorMsgViewModel extends ViewModel {
    private MutableLiveData<String> errorMsg;

    public MutableLiveData<String> getErrorMsg() {
        if(errorMsg == null){
            errorMsg = new MutableLiveData<>();
        }
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg.setValue(errorMsg);
    }
}
