import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
import DataBase from '../Database/DataBase';
// import Banner from '../banner.js';
// import { getLoggedUser } from '../users.js';
// import {Link} from 'react-router-dom';
// import { AddChat } from './AddChat.js';

export function SidebarList(props){
    const user = props.user;

    //Handling a click on a chat in the chats bar on the left
    const handleChatClick = event=>{    
        // Going down the tree of elements in order to get the username
        if(event.target.tagName == "LI")
        {    
            let username = event.target.firstChild.firstChild.firstChild;
            console.log(username.data);
            props.chatClick(username.data);
        }
    }

    return (<>
        {/* The chats list on the left side */}
        <ul className='list-group'>
            <li className = 'list-group-item d-flex justify-content-between'>
                <div className="ms-2 fw-bold">{user._username}</div>
                {/* Button to add chats */}
                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="bi bi-person-plus icon"/>
                </button>
            </li>
            {/* Getting the list of all chats converted into <li></li> */}
            {DataBase.getChats(user._username).map((chat, index) => {
                    return <li className = 'list-group-item d-flex justify-content-between align-items-start chat-item' key={index} onClick={handleChatClick}>
                        <div className="ms-2 me-auto">
                            {/* the name of the person chattin with */}
                            <div id='chatPartner'className="fw-bold">{user._username === chat.userID1 ? chat.userID2: chat.userID1}</div>
                                {/* Here will go the last message */}
                                {chat.messages[0].data}
                            </div>
                            {/* Here is the timestamp of the last message */}
                            <span className='position-absolute end-0 bottom-0 m-2'>{chat.messages[0].timeStamp}</span>
                            <span className="badge bg-primary rounded-pill">1{/* Here will go the num of the updates */}</span>
                        </li>
            })}
        </ul>
    </>);
}

export default SidebarList;