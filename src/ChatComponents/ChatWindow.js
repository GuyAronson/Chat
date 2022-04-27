import React, { useEffect, useRef, useState } from 'react';
import { Container, Card,OverlayTrigger, Button, Popover, Dropdown, DropdownButton } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { getLoggedUser } from './ChatPage';
import DataBase from '../Database/DataBase';
import { TheirMessage } from './TheirMessage';
import { MyMessage } from './MyMessage';
import { ImageUpload } from './UploadModals/ImageUpload';
import { VideoUpload } from './UploadModals/VideoUpload';
import { AudioUpload } from './UploadModals/AudioUpload';

export function ChatWindow({messages, input, changeInput, sendText, sendImage, sendVideo, sendAudio, chat, user}){
    // element to keep the last message in view
    const partner = (chat && user) ? (user.getUsername === chat.userID1 ? chat.userID2 : chat.userID1) : '';
    // creates the effect that the last messages is shown first
    const endDiv = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            endDiv.current.scrollIntoView()
        }, 25);
    })

    // function - Renders messages into the screen
    const RenderMessages = () => {
        return messages.map((msg, index) => {
            // check if my message is writen by the user or the partner
            let isMyMessage = user.getUsername === msg.authorID ? true : false;
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
    
    /**
     * This function handles the send by key in the input
     */
    function handleSendByKey(e) {
        if (e.key === 'Enter' && input) {
            e.target.value = '';
            sendText();
        }
    }

    function sendByMouse() {
        sendText();
        document.getElementById("input").value = "";
    }

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
                    {(user && messages) && RenderMessages()}
                    <div id='chat-end' ref={endDiv} style={{float: 'left', clear: 'both'}}></div>
                </Card.Body>
            </Card>

            {/* ChatFooter*/}
            <Card id ='chat-footer'>
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className='upload-dropdown'>
                        <i className="bi bi-paperclip"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" >
                            <AudioUpload sendMessage={sendAudio}/>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2" >
                            <ImageUpload sendMessage={sendImage}/>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3" >
                            <VideoUpload sendMessage={sendVideo}/>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <input 
                    className="form-control msg-input" type='text' placeholder='Type your message here...'
                    onChange={(event) => changeInput(event.target.value)} onKeyDown={handleSendByKey} id="input"
                />
                <button className="btn btn-primary send-button" onClick={sendByMouse}   >
                    <i className="bi bi-send"/>
                </button>
                
            </Card>
        </Container>
    </>);
}

export default ChatWindow;