import React, { useEffect, useRef, useState } from 'react';
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

export function ChatWindow({messages, input, changeInput, send, chat, user}){
    // element to keep the last message in view
    const partner = user.getUsername === chat.userID1 ? chat.userID1 : chat.userID2;
    // creates the effect that the last messages is shown first
    const endDiv = useRef(null);
    useEffect(() => {
        endDiv.current.scrollIntoView();
    })
    //const chaT = DataBase.getChatByBothUsers(partner, getLoggedUser().getUsername);
    //const messageS = chaT ? chat.messages : [];
    // useState in order to re-render the page once a message has been sent
    // const [messagesAmount, setMessagesAmount] = useState(messages.length);
    // console.log(messagesAmount);

    // function - Renders messages into the screen
    const RenderMessages = () => {
        return messages.map((msg, index) => {
            // check if my message is writen by the user or the partner
            let isMyMessage = user === msg.authorID ? true : false;
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
    // //Enter click event listener - can be pressed with onKey prorperites
    // if(document.querySelector(".msg-input")){
    //     document.querySelector(".msg-input").addEventListener("keypress", event => {
    //         // Enter was clicked a partner was picked
    //         if(event.keyCode === 13 && partner){
    //             event.preventDefault();
    //             document.querySelector('.send-button').click();
    //         }
    //     });
    // }
    
    /**
     * This function handles the send by key in the input
     */
    function handleSendByKey(e) {
        if (e.key === 'Enter' && input) {
            send();
        }
    }

    // Handle send message
    // const handleSendMesasge = () =>{
    //     let message_text = document.querySelector(".msg-input").value;
    //     if(message_text !== ''){
    //         if(chat){
    //             chat.addMessage(message_text, "message", loggedUsername);
    //             setMessagesAmount(chat.messages.length);
    //             // console.log("message has added! ", chat);
    //             document.querySelector(".msg-input").value = '';
    //         }
    //     }
    // }
    return(<>
        {/* Chat header */}
        <Container>
            <Card>
                <Card.Header>
                    {/* Need to add a profile pic */}
                    {partner &&
                    <div><img className='profile-pic' src={DataBase.getUserByID(partner).getPicture} alt= "Bruh.."/>
                    <span id="header-partner-uname">{partner}</span></div>}
                </Card.Header>
            </Card>

            {/* Chat Body - messages goes here */}
            <Card>
                <Card.Body id='chat-body'>
                    {RenderMessages()}
                    <div id='chat-end' ref={endDiv} style={{float: 'right', clear: 'both'}}></div>
                </Card.Body>
            </Card>

            {/* ChatFooter*/}
            <Card id ='chat-footer'>
                <OverlayTrigger trigger="click" placement="top" overlay={popoverTop} rootClose={true}>
                    <button className="btn btn-light upload-popover"><i className="bi bi-arrow-bar-up"/></button>
                </OverlayTrigger>
                <input 
                    className="form-control msg-input" type='text' placeholder='Type your message here...'
                    onChange={(event) => changeInput(event.target.value)} onKeyDown={handleSendByKey}
                />
                <button className="btn btn-primary send-button" onClick={send()}>
                    <i className="bi bi-send"/>
                </button>
                
            </Card>
        </Container>
    </>);
}

export default ChatWindow;