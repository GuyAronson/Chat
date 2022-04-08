import React from 'react';
import ReactDOM from 'react-dom/client';
import Banner from './banner.js';
import Register from './register.js';

//Objects of users - contains username, password, nickname, map of messages
var users = [];

class Chat extends React.Component{
    render(){
        return(
            <>
                <div><Banner/></div>
                <div className='content'>
                    <div className='form'><Register/></div>
                </div>
            </>
        );
    }
}

export default Chat;