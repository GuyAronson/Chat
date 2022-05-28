import React, { useEffect, useRef } from 'react';
import { Container, Card , Dropdown } from 'react-bootstrap';
import { TheirMessage } from "./Messages/TheirMessage"
import { MyMessage } from './Messages/MyMessage';
import { ImageUpload } from './UploadModals/ImageUpload';
import { VideoUpload } from './UploadModals/VideoUpload';
import { AudioUpload } from './UploadModals/AudioUpload';
import { getContacts } from '../../../fetch';

export function ChatWindow({messages, input, changeInput, sendText, chat, user}){

    const partner = chat.Partner;
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
            let isMyMessage = user.Username === msg.Author ? true : false;
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
            sendText(partner);
        }
    }

    function sendByMouse() {
        sendText(partner);
        document.getElementById("input").value = "";
    }

    return(<>
        {/* Chat header */}
        <Container>
            <Card>
                <Card.Header>
                    {/* Need to add a profile pic */}
                    {partner && <div>
                        {/* <img className='profile-pic' src={DataBase.getUserByID(partner).getPicture} alt= "Bruh.."/> */}
                    <span id="header-partner-uname">{partner.Nickname}</span></div>}
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
                            <AudioUpload />
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2" >
                            <ImageUpload />
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3" >
                            <VideoUpload />
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