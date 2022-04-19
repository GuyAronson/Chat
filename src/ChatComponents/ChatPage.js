import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router';
import Banner from '../banner.js';
import ChatWindow from './ChatWindow.js';
import SidebarList from './SidebarList';
import { Container, Row, Col } from 'react-bootstrap';
import DataBase from '../Database/DataBase.js';
import UsernameInput from '../Register-login/UsernameInput.js';

var loggedUser = DataBase.getUserByID("guy");
// var loggedUser = null;
export var getLoggedUser = () => loggedUser;
export var setLoggedUser = user =>loggedUser = user;

class ChatPage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            logout: false,
            chatPartner: ''
        }
        this.Logout = this.Logout.bind(this);
        this.clickOnChat = this.clickOnChat.bind(this);
    }
    
    //Function to log out from the chat window - returns to log in
    Logout(event){
        setLoggedUser(null);
        console.log("user changed");
        this.setState({logout: true});
    }

    // Function that will execute once the user clicks on a chat - passed to SidebarList
    clickOnChat(username){
        this.setState({chatPartner : DataBase.getUserByID(username)._username});
    }
    render(){
        return(
            <>
                {/* Navigate back to the login page if the logout was selected */}
                {this.state.logout && <Navigate to='/login' replace={true}/> }

                {/* The chat page */}
                <div><Banner/></div>
                {/* Hello & logout button */}
                {getLoggedUser() && <blockquote id='hello' className="blockquote">Hello, {getLoggedUser()._nickname}</blockquote>}
                <button className='mb-3 btn btn-lg btn-light logout' onClick={this.Logout}>Logout</button>

                <Container>
                <Row>
                    <Col sm={4} >
                        {/* Sidebar of chats */}
                        {getLoggedUser() && <SidebarList user={getLoggedUser()} chatClick={this.clickOnChat}/>}                    
                        <div id='container-recipients'>
                        </div>
                    </Col>
                    <Col sm={8} >
                        {/* Chat body */}
                        <ChatWindow partner={this.state.chatPartner}/>
                    </Col>
                </Row>
                </Container>
            </>
        );
    }
}

export default ChatPage;