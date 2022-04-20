import React from 'react';
import { Card, Container } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import DataBase from '../Database/DataBase.js'
import {getLoggedUser} from './ChatPage.js';
import { MyMessage } from './MyMessage.js';
import { TheirMessage } from './TheirMessage.js';

export default function ChatBody(props){

    var messages = [];
    var loggedUsername = '';
    if(props.partner){
        loggedUsername = getLoggedUser()._username;
        messages = DataBase.getChatByBothUsers(props.partner, loggedUsername).messages;
    }
    const RenderMessages = () => {
        messages.map((msg, index) => {
            let isMyMessage = loggedUsername === msg.authorID ? true : false;
            return (
                <div key={'msg_${index}'} className="msg-block">
                    {
                        isMyMessage
                        ? <MyMessage message={msg} key={index}></MyMessage> :
                        <TheirMessage message={msg} key={index}></TheirMessage>
                        
                    }
                </div>
            )
            
        })
    }
    return(<>
        <Card>
            <Card.Body id='chat-body'>
                {RenderMessages()}
            </Card.Body>
        </Card>
    </>);
}