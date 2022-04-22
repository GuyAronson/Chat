import React, { useState } from 'react';
import { Container, Card,OverlayTrigger, Button, Popover } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { getLoggedUser } from './ChatPage';
import DataBase from '../Database/DataBase';
import { TheirMessage } from './TheirMessage';
import { MyMessage } from './MyMessage';

// const scrollBottom = (querySelector) =>{
//     let c = document.querySelector(querySelector);
//     c.scrollTop = document.body.scrollHeight;
// }

export function ChatWindow(props){
    const loggedUsername = getLoggedUser().getUsername;
    const chat = DataBase.getChatByBothUsers(props.partner, getLoggedUser().getUsername);
    const messages = chat ? chat.messages : [];
    // useState in order to re-render the page once a message has been sent
    const [messagesAmount, setMessagesAmount] = useState(messages.length);
    console.log(messagesAmount);

    // function - Renders messages into the screen
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
    // Upload popover elements
    const popoverTop = (
        <Popover id="popover-positioned-top" title="Popover top">
          <div class='btn btn-sm upload-button'><button><span> <i class="bi bi-mic-fill"/> Audio</span></button></div>
          <div class='btn btn-sm upload-button'><button><span> <i class="bi bi-camera-fill"/> Photo</span></button></div>
          <div class='btn btn-sm upload-button'><button><span> <i class="bi bi-camera-video-fill"/> Video</span></button></div>
          <div class='btn btn-sm upload-button'><button><span> <i class="bi bi-geo-alt-fill"/> Location</span></button></div>
        </Popover>
    );
    //Enter click event listener
    if(document.querySelector(".msg-input")){
        document.querySelector(".msg-input").addEventListener("keypress", event => {
            // Enter was clicked a partner was picked
            if(event.keyCode === 13 && props.partner){
                event.preventDefault();
                document.querySelector('.send-button').click();
            }
        });
    }
    // Handle send message
    const handleSendMesasge = () =>{
        let message_text = document.querySelector(".msg-input").value;
        if(message_text !== ''){
            if(chat){
                chat.addMessage(message_text, "message", loggedUsername);
                setMessagesAmount(chat.messages.length);
                // console.log("message has added! ", chat);
                document.querySelector(".msg-input").value = '';
            }
        }
    }
    return(<>
        {/* Chat header */}
        <Container>
            <Card>
                <Card.Header>
                    {/* Need to add a profile pic */}
                    {props.partner &&
                    <div><img className='profile-pic' src={DataBase.getUserByID(props.partner).getPicture} alt= "Bruh.."/>
                    <span id="header-partner-uname">{props.partner}</span></div>}
                </Card.Header>
            </Card>

            {/* Chat Body - messages goes here */}
            <Card>
                <Card.Body id='chat-body'>
                    {RenderMessages()}
                    {/* {scrollBottom("#chat-body")} */}
                    <div id='chat-end'></div>
                </Card.Body>
            </Card>

            {/* ChatFooter*/}
            <Card id ='chat-footer'>
                <OverlayTrigger trigger="click" placement="top" overlay={popoverTop} rootClose={true}>
                    <button className="btn btn-light upload-popover"><i className="bi bi-arrow-bar-up"/></button>
                </OverlayTrigger>
                <input className="form-control msg-input" type='text' placeholder='Type your message here...'/>
                <button className="btn btn-primary send-button" onClick={handleSendMesasge}>
                    <i className="bi bi-send"/>
                </button>
                
            </Card>
        </Container>
    </>);
}

export default ChatWindow;