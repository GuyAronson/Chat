import React from 'react';
import Banner from '../banner.js';
import ChatWindow from './ChatWindow.js';
import SidebarList from './SidebarList';
import { Container, Row, Col } from 'react-bootstrap';
import { Database } from '../Database/index.js';
import { useState, useEffect } from 'react';

var loggedUser = Database.Server.getUserByID("idan");
// var loggedUser = null;
export var getLoggedUser = () => loggedUser;
export var setLoggedUser = user =>loggedUser = user;

function ChatPage(){
    const currentUser = getLoggedUser();
    // this is the users chats.
    const userDataContext = currentUser !== null? Database.Server.getChats(currentUser.getUsername) : null;
    // this is data the chat works with
    const [userChats, setUserChats] = useState(userDataContext);
    // get the message from the user
    const [input, setInput] = useState('');
    // this will be the selectChat, it will have all the data we need
    const [selectChat, setSelectedChat] = useState({});
    // this are the current messages
    const [currentMessages, setCurrentMessages] = useState([]);
    // something that will not be used
    
    /**
     * This will change the current messages when one the evetns below occours:
     * 1. A new chat was selected
     * 2. A new message was sent
     * It will always get the messages from the selectedChat so whether a different chat was selected or a new message
     * was sent the result will be the same
     */
     useEffect(() => {
         // Set the current chat
        const currentChat = selectChat ? Database.Server.getChatByID(selectChat.id): undefined;
        setCurrentMessages((currentChat && currentChat.messages) || []);
    }, [selectChat, userChats])

    // method to handle sending a message
    const pushTextMessage = ()=> {
        // find the chat index
        // const chat = selectChat? Database.Server.getChatByID(selectChat.id) : undefined;
        // first check if the data is not empty
        if (selectChat && input) {
            // add the message
            selectChat.addMessage(input, "text", currentUser.getUsername);
            // update the whole chats (to invoke useEffect)
            setUserChats(Database.Server.getChats(currentUser.getUsername));
            // reset the input
            setInput('');
        }
    }
    const pushImageMessage = (url) => {
        if (selectChat && url) {
            selectChat.addMessage(url, "image", currentUser.getUsername);
            setUserChats(Database.Server.getChats(currentUser.getUsername));
        } 
    }
    const pushVideoMessage = (url) => {
        if (selectChat && url) {
            selectChat.addMessage(url, "video", currentUser.getUsername);
            setUserChats(Database.Server.getChats(currentUser.getUsername));
        }
    }
    const pushAudioMessage = (record) => {
        if (selectChat && record) {
            selectChat.addMessage(record, "audio", currentUser.getUsername);
            setUserChats(Database.Server.getChats(currentUser.getUsername));
        }
    }
    return(
        <>
            {/* The chat page */}
            <div><Banner/></div>
            {/* Hello & logout button */}
            {getLoggedUser() && <blockquote id='hello' className="blockquote">Hello, {getLoggedUser().getNickName}</blockquote>}
            <div id="chat-page">
            <Container >
            <Row>
                <Col></Col>
                <Col sm={2}>
                    {/* Sidebar of chats */}
                    {getLoggedUser() && <SidebarList user={currentUser} changeChat={setSelectedChat} chats={userChats} setUserChats={setUserChats}/>}
                    {/* <div id='container-recipients'>
                    </div> */}
                </Col>
                <Col sm={8}>
                    {/* Chat body */}
                    <ChatWindow messages={currentMessages} input={input} changeInput={setInput} 
                        sendText={pushTextMessage} chat={selectChat} user={currentUser}
                        sendImage={pushImageMessage} sendVideo={pushVideoMessage} sendAudio={pushAudioMessage}/>
                </Col>
                <Col></Col>
            </Row>
            </Container>
            </div>
        </>
    );
}

export default ChatPage;