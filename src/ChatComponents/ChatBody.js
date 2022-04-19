import React from 'react';
import { Card, Container } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import DataBase from '../Database/DataBase.js'
import {getLoggedUser} from './ChatPage.js';

export default function ChatBody(props){
    let messages = [];
    let loggedUsername = '';
    if(props.partner){
        loggedUsername = getLoggedUser()._username;
        messages = DataBase.getChatByBothUsers(props.partner, loggedUsername).messages;
    }
    console.log("ChatBody: ", messages);
    return(<>
        <Card>
            <Card.Body id='chat-body'>
                {messages.map((message, index)=>{
                    // My message - should be right side
                    if(message.authorID == loggedUsername){
                        return <div class="message" key={index}>
                            <h5>{message.authorID}</h5>
                            <p>{message.data}</p>
                            <i>{message.timeStamp}</i>
                            <br/><br/><br/>
                        </div>
                    } 
                    else{
                        //His messages - should be left side
                        return <div class="message" key={index}>
                            <h5>{message.authorID}</h5>
                            <p>{message.data}</p>
                            <i>{message.timeStamp}</i>
                        </div>
                    }
                })}
            </Card.Body>
        </Card>
    </>);
}