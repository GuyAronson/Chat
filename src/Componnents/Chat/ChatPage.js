import React from 'react';
import ChatWindow from './ChatWindow/ChatWindow.js';
import SidebarList from './Sidebar/SidebarList';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import {allUsers,addMessage, getContacts , getUserChats, getChatByID, sendMessage, getUser, server, goReview} from '../../fetch';


export const ChatPage = ({loggedUser}) => {
    // send him to the home page
    if(!loggedUser || loggedUser == {})
        window.location.href = window.location.origin;
    // this is data the chat works with
    const [userChats, setUserChats] = useState([]);
    // get the message from the user
    const [input, setInput] = useState('');
    // this will be the selectChat, it will have all the data we need
    const [selectChat, setSelectedChat] = useState({});
    // this are the current messages
    const [currentMessages, setCurrentMessages] = useState([]);
    // signalR connection
    const [connection, setConnection] = useState(null);
    

    useEffect(()=>{
        const afterLogin = async ()=>{
            if(loggedUser.Username != ""){
                let chats = await getUserChats(loggedUser.Username);
                console.log("chats after fetch: ", chats);
                setUserChats(chats);
            }
        };
        afterLogin();       //Calling the function right after
    }, [loggedUser]);

    // Connecting to the hub
    useEffect(() => {
        const signalR = new HubConnectionBuilder().withUrl(
            server + '/Hubs/ChatHub', {
                transport: HttpTransportType.WebSockets
            }
        ).withAutomaticReconnect().build();
        setConnection(signalR);
    }, [])

    // update when message recived
    useEffect( () => {
        if (connection) {
            connection.start().then( () => {
                connection.on(
                    'ReceiveMessage', async function (username, serverAddress) {
                        if (loggedUser.Username === username && serverAddress === server) {
                            const newChats = await getUserChats(username);
                            setUserChats(newChats);
                        }
                    }
                )
            })
        }
    },[connection])


    /**
     * This will change the current messages when one the evetns below occours:
     * 1. A new chat was selected
     * 2. A new message was sent
     * It will always get the messages from the selectedChat so whether a different chat was selected or a new message
     * was sent the result will be the same
     */
     useEffect(() => {
         console.log("rerender chats");
         // Set the current chat
        const currentChat = selectChat ? userChats.find(chat=> chat.ID == selectChat.ID): undefined;
        console.log("currentChat: ", currentChat);
        // setCurrentMessages((currentChat && await getMessages(currentChat.UserID, currentChat.PartnerID)));
        if(currentChat){
            if(currentMessages){
                let msgs = currentChat.Messages;
                setCurrentMessages(msgs);
                // msgs.sort()
            } else{
                setCurrentMessages([]);
            }
        }
    }, [selectChat, userChats]);

    // method to handle sending a message
    const pushTextMessage = async (partner)=> {
        // first check if the data is not empty
        if (selectChat && input) {
            // get important details
            // const contacts = await getContacts(loggedUser.Username);
            // const currentPartner = contacts.find(usr => usr.Username === partner);
            const currentPartner = selectChat.Partner;

            // add message to the user chat
            let promise1 = await addMessage(loggedUser.Username, currentPartner.Username, input);
            const partnerURL = currentPartner.ServerAddress;
            // add message to the user chat
            let promise2 = await sendMessage(currentPartner.Username, partnerURL, loggedUser.Username, input);
            // selectChat.addMessage(input, "text", loggedUser.getUsername);
            // update the whole chats (to invoke useEffect)
            const newChats = await getUserChats(loggedUser.Username)
            setUserChats(newChats);
            // reset the input
            setInput('');
        }
    }
    // const pushImageMessage = (url) => {
    //     if (selectChat && url) {
    //         selectChat.addMessage(url, "image", loggedUser.getUsername);
    //         setUserChats(Database.Server.getChats(loggedUser.getUsername));
    //     } 
    // }
    // const pushVideoMessage = (url) => {
    //     if (selectChat && url) {
    //         selectChat.addMessage(url, "video", loggedUser.getUsername);
    //         setUserChats(Database.Server.getChats(loggedUser.getUsername));
    //     }
    // }
    // const pushAudioMessage = (record) => {
    //     if (selectChat && record) {
    //         selectChat.addMessage(record, "audio", loggedUser.getUsername);
    //         setUserChats(Database.Server.getChats(loggedUser.getUsername));
    //     }
    // }
    // const click = async ()=> await getUserChats("guy");
    return(
        <>
            {<blockquote id='hello' className="blockquote">Hello, {loggedUser.Nickname}</blockquote>}
            <button id="fetch" onClick={()=>window.location.href="http://localhost:3000/login"}>Logout</button>
            <button id="rate" onClick={goReview}>Rate Us!</button>
            <div id="chat-page">
            <Container >
            <Row>
                <Col></Col>
                <Col sm={2}>
                    {/* Sidebar of chats */}
                    {loggedUser && <SidebarList user={loggedUser} changeChat={setSelectedChat} chats={userChats} setUserChats={setUserChats}/>}
                    <div id='container-recipients'>
                    </div>
                </Col>
                <Col sm={8}>
                    {/* Chat body */}
                    <ChatWindow messages={currentMessages} input={input} changeInput={setInput} 
                        sendText={pushTextMessage} chat={selectChat} user={loggedUser}/>
                </Col>
                <Col></Col>
            </Row>
            </Container>
            </div>
        </>
    );
}

export default ChatPage;