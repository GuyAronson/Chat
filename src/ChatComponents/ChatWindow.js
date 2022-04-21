import React from 'react';
import { Container, Card,OverlayTrigger, Button, Popover } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { getLoggedUser } from './ChatPage';
import DataBase from '../Database/DataBase';
import { TheirMessage } from './TheirMessage';
import { MyMessage } from './MyMessage';

export function ChatWindow(props){
    var messages = [];
    var loggedUsername = '';
    if(props.partner){
        loggedUsername = getLoggedUser()._username;
        messages = DataBase.getChatByBothUsers(props.partner, loggedUsername).messages;
    }
    const RenderMessages = () => {
        return messages.map((msg, index) => {
            let isMyMessage = loggedUsername === msg.authorID ? true : false;
            return (
                <div key={`msg_${index}`} className="msg-block">
                    {   
                        isMyMessage
                        ? <MyMessage message={msg}></MyMessage> :
                        <TheirMessage message={msg}></TheirMessage>
                    }
                </div>
            )  
        });
    }
    const popoverTop = (
        <Popover id="popover-positioned-top" title="Popover top">
          <div class='btn btn-sm upload-button'><button><span> <i class="bi bi-mic-fill"/> Audio</span></button></div>
          <div class='btn btn-sm upload-button'><button><span> <i class="bi bi-camera-fill"/> Photo</span></button></div>
          <div class='btn btn-sm upload-button'><button><span> <i class="bi bi-camera-video-fill"/> Video</span></button></div>
          <div class='btn btn-sm upload-button'><button><span> <i class="bi bi-geo-alt-fill"/> Location</span></button></div>
        </Popover>
      );

    return(<>
        {/* Chat header */}
        <Container>
            <Card>
                <Card.Header>
                    {/* Need to add a profile pic */}
                    Chat with {props.partner}
                </Card.Header>
            </Card>

            {/* Chat Body - messages goes here */}
            <Card>
                <Card.Body id='chat-body'>
                    {RenderMessages()}
                </Card.Body>
            </Card>
            <div id='chat-end'></div>

            {/* ChatFooter*/}
            <Card id ='chat-footer'>
                <OverlayTrigger trigger="click" placement="top" overlay={popoverTop}>
                    <button className="btn btn-light upload-popover"><i class="bi bi-arrow-bar-up"/></button>
                </OverlayTrigger>
                <input className="form-control msg-input" type='text' placeholder='Type your message here...'/>
                <button className="btn btn-primary send-button">
                    <i className="bi bi-send"/>
                </button>
                
            </Card>
        </Container>
    </>);
}

export default ChatWindow;