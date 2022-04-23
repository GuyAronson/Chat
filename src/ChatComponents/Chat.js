import { Database } from "../Database"
import { useState, useEffect } from "react"
import Banner from "../banner";
import { Container, Row, Col } from 'react-bootstrap';
import ChatWindow from './ChatWindow.js';
import SidebarList from './SidebarList';
// we can get the user name from the server - getLogged
var loggedUser = Database.Server.getUserByID("idan");
export var getLoggedUser = () => loggedUser;
export var setLoggedUser = user =>loggedUser = user;

function ChatPage() {
    const currentUser = getLoggedUser();
    // this is the users chats.
    const userDataContext = Database.Server.getChats(currentUser.getUsername);
    // this is data the chat works with
    const [userChats, setUserChats] = useState(userDataContext);
    // get the message from the user
    const [input, setInput] = useState('');
    // this will be the selectChat, it will have all the data we need
    const [selectChat, setSelectedChat] = useState({});
    // this are the current messages
    const [currentMessages, setCurrentMessages] = useState([]);
    // irrelevant stuff for logout
    const [logout, setLogout] = useState(false);
    //Function to log out from the chat window - returns to log in
    const Logout = (event) => {
        setLoggedUser(null);
        console.log("user changed");
        setLogout(true);
    }
    /**
     * This will change the current messages when one the evetns below occours:
     * 1. A new chat was selected
     * 2. A new message was sent
     * It will always get the messages from the selectedChat so whether a different chat was selected or a new message
     * was sent the result will be the same
     */
    useEffect(() => {
        const currentChat = Database.Server.getChatByID(selectChat.id);
        setCurrentMessages((currentChat && currentChat.messages) || []);
    }, [selectChat, userChats])

    // method to handle sending a message
    function pushMessage() {
        // find the chat index
        const chat = Database.Server.getChatByID(selectChat.id);
        // first check if the data is not empty
        if (input) {
            // add the message
            chat.addMessage(input, "message", currentUser.getUsername);
            // update the whole chats (to invoke useEffect)
            setUserChats(Database.Server.getChats(currentUser.getUsername));
            // reset the input
            setInput('');
        }
    }

    return (
        <>
            {/* The chat page */}
            <div><Banner/></div>
            {/* Hello & logout button */}
            {currentUser && <blockquote id='hello' className="blockquote">Hello, {currentUser.getNickname}</blockquote>}

            <Container id="chat-page">
            <Row>
                <Col></Col>
                <Col></Col>
                <Col sm={2}>
                    {/* Sidebar of chats */}
                    {currentUser && <SidebarList user={currentUser} changeChat={setSelectedChat} chats={userChats}/>}
                    <div id='container-recipients'>
                    </div>
                </Col>
                <Col sm={8}>
                    {/* Chat body */}
                    <ChatWindow
                        messages={currentMessages} input={input} changeInput={setInput} 
                        send={pushMessage} chat={selectChat}  user={currentUser}
                    />
                </Col>
                
            </Row>
            </Container>

        </>
    )
}

export default ChatPage;