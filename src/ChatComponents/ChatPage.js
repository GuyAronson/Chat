import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router';
import Banner from '../banner.js';
import ChatWindow from './ChatWindow.js';
import SidebarList from './SidebarList';
import { Container, Row, Col } from 'react-bootstrap';
import DataBase from '../Database/DataBase.js';
import { useState } from 'react';

var loggedUser = DataBase.getUserByID("idan");
// var loggedUser = null;
export var getLoggedUser = () => loggedUser;
export var setLoggedUser = user =>loggedUser = user;

function ChatPage(){
    const [logout, setLogout] = useState(false);
    const [chatPartner, setChatPartner] = useState(null);
    
    //Function to log out from the chat window - returns to log in
    const Logout = (event) => {
        setLoggedUser(null);
        console.log("user changed");
        setLogout(true);
        setChatPartner('');
    }

    // Function that will execute once the user clicks on a chat - passed to SidebarList
    const clickOnChat = (username)=>{
        setChatPartner(DataBase.getUserByID(username)._username);
    }
    return(
        <>
            {/* Navigate back to the login page if the logout was selected */}
            {logout && <Navigate to='/login' replace={true}/> }

            {/* The chat page */}
            <div><Banner/></div>
            {/* Hello & logout button */}
            {getLoggedUser() && <blockquote id='hello' className="blockquote">Hello, {getLoggedUser()._nickname}</blockquote>}
            <button className='mb-3 btn btn-lg btn-light logout' onClick={Logout}>Logout</button>

            <Container id="chat-page">
            <Row>
                <Col></Col>
                <Col></Col>
                <Col sm={2}>
                    {/* Sidebar of chats */}
                    {getLoggedUser() && <SidebarList user={getLoggedUser()} chatClick={clickOnChat}/>}                    
                    <div id='container-recipients'>
                    </div>
                </Col>
                <Col sm={8}>
                    {/* Chat body */}
                    <ChatWindow partner={chatPartner}/>
                </Col>
                
            </Row>
            </Container>
        </>
    );
}

export default ChatPage;