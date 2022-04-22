import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
import DataBase from '../Database/DataBase';
import { OverlayTrigger, Popover } from 'react-bootstrap';

export function SidebarList(props){
    const user = props.user;
    const [userchats, setUserChats] = useState(DataBase.getChats(user.getUsername));

    //Adding a new chat to the list of the user's chats
    const addChat = username =>{
        if(user.getUsername === username){
            document.querySelector("#insert-chat-popover span").innerHTML = "You can't add yourself!";
            return;
        }
        if(DataBase.queryUserName(username)){
            // Create new chat
            let chatID = DataBase.createNewChat([], user.getUsername, username);
            // add the chat id to both of the users
            user.addChat(chatID);
            let user2 = DataBase.getUserByID(username);
            user2.addChat(chatID);
            
            //Assigning the chats in useState to rerender
            setUserChats(DataBase.getChats(user.getUsername));

            document.body.click();
        }
        else
            document.querySelector("#insert-chat-popover span").innerHTML = "Wrong username!";
    }
    const handleAddChatclick = event=>{
        // parentElement is the entire div
        // childNodes[2] is the text input
        addChat(event.target.parentElement.childNodes[2].value);
    }
    //Handling a click on a chat in the chats bar on the left
    const handleChatClick = event=>{    
        if(event.target.tagName == "LI")
        {    //Make the button active
            let currentActive = document.getElementsByClassName("active");
            if(currentActive.length)
                currentActive[0].className = currentActive[0].className.replace(" active", "");
            event.target.className += " active";
            
            // Going down the tree in order to get the username li->div(#chatPartner)
            let username = event.target.firstChild.childNodes[1].firstChild;
            props.chatClick(username.data);
        }
    }
    //Add chat popover
    const popoverDown = (
        <Popover id="insert-chat-popover" title="Popover bottom">
            <strong>Insert user to chat with:</strong>
            <input type="text" id="insert-user-input" className="form-control" placeholder="Insert username"/>
            <span className='error-message d-block small'></span>
            <button id="insert-user-button" className='btn btn-sm btn-primary' onClick={handleAddChatclick}>Enter</button>
        </Popover>
    );
    const setFocusPopover = ()=>{
        setTimeout(()=>{
            if(document.getElementById("insert-user-input")){
                document.getElementById("insert-user-input").focus();
                //Enter click event listener
                document.querySelector("#insert-user-input").addEventListener("keypress", event => {
                    console.log("keypress!");
                    // Enter was clicked a partner was picked
                    if(event.keyCode === 13){
                        event.preventDefault();
                        document.querySelector('#insert-user-button').click();
                    }
                });
            }
        }, 50)
    }

    return (<>
        {/* The chats list on the left side */}
        <ul className='list-group chat-sidebar'>
            <li className = 'list-group-item d-flex justify-content-between align-items-stretch'>
                <img className='profile-pic' src={user.getPicture} alt= "Bruh.."/>
                <span className="header-username">{user.getUsername}</span>
                {/* Button to add chats */}
                <OverlayTrigger trigger="click" placement="bottom" overlay={popoverDown} rootClose={true}>
                    <button type="button" className="btn icon-button" onClick={setFocusPopover}><i className="bi bi-person-plus icon"/></button>
                </OverlayTrigger>
            </li>
            {/* Getting the list of all chats converted into <li></li> */}
            {userchats.map((chat, index) => {
                    // Getting the partner username -> get his profile pic
                    let partner = chat._userID1 === user.getUsername? chat.userID2: chat.userID1;
                    return <li className = 'list-group-item chat-item' key={index} onClick={handleChatClick}>
                        <div className=' d-flex justify-content-start align-items-start'>
                            {/* profile pic */}
                            <img className='profile-pic-small' src={DataBase.getUserByID(partner).getPicture} alt= "Bruh.."/>
                            {/* the name of the person chattin with */}
                            <div className='chatPartner'>{user._username === chat.userID1 ? chat.userID2: chat.userID1}</div>
                        </div>
                        {/* Here will go the last message */}
                        <div className='last-message'>{chat.messages.length ? chat.messages[0].data : ''}</div>
                        {/* Here is the timestamp of the last message */}
                        <span className='position-absolute end-0 bottom-0 m-2 msg_timeStamp'>{chat.messages.length ? chat.messages[0].timeStamp : ''}</span>
                        </li>
            })}
        </ul>
    </>);
}

export default SidebarList;