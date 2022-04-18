import React from 'react';
import ReactDOM from 'react-dom/client';
import {getUsers} from './Data Base/DataBase';

class Chat extends React.Component{
    render(){
        return(
            <h1>This is the chat!{getUsers().map(user => console.log(user))}</h1>
        );
    }
}

export default Chat;