// this is a file i used at draft - to not delete


import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
import DataBase from '../Database/DataBase';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Database } from '../Database';

export function SidebarList({user, chats, chageChat}){
    const popoverDown = (
        <Popover id="insert-chat-popover" title="Popover bottom">
            <strong>Insert user to chat with:</strong>
            <input type="email" className="form-control" placeholder="Insert username"/>
            <span className='error-message d-block small'></span>
            <button className='btn btn-sm btn-primary'>Enter</button>
        </Popover>
    );
    function handleClickOnChatBox(id) {
        const newChat = Database.Server.getChatByID(id);
        // chageChat(newChat);
    }
    return (<>
        {/* The chats list on the left side */}
        <ul className='list-group chat-sidebar'>
            <li className = 'list-group-item d-flex justify-content-between align-items-stretch'>
                <img className='profile-pic' src={user.getPicture} alt= "Bruh.."/>
                <span className="header-username">{user.getUsername}</span>
                {/* Button to add chats */}
                <OverlayTrigger trigger="click" placement="bottom" overlay={popoverDown} rootClose={true}>
                    <button type="button" className="btn icon-button"><i className="bi bi-person-plus icon"/></button>
                </OverlayTrigger>
            </li>
            {/* Getting the list of all chats converted into <li></li> */}
            {chats.map((chat, index) => {
                    // Getting the partner username -> get his profile pic
                    let partner = chat._userID1 === user.getUsername? chat.userID2: chat.userID1;
                    return <li className = 'list-group-item d-flex justify-content-between align-items-start chat-item' key={index}
                            onClick={handleClickOnChatBox(chat.id)}>
                        <div className="me-auto">
                            {/* profile pic */}
                            <img className='profile-pic-small' src={DataBase.getUserByID(partner).getPicture} alt= "Bruh.."/>
                            {/* the name of the person chattin with */}
                            <div className='chatPartner'>{user._username === chat.userID1 ? chat.userID2: chat.userID1}</div>
                            {/* Here will go the last message */}
                            <div className='last-message'>{chat.messages.length ? chat.messages[0].data : ''}</div>
                        </div>
                        {/* Here is the timestamp of the last message */}
                        <span className='position-absolute end-0 bottom-0 m-2 msg_timeStamp'>{chat.messages.length ? chat.messages[0].timeStamp : ''}</span>
                        <span className="badge bg-primary rounded-pill">1{/* Here will go the num of the updates */}</span>
                        </li>
            })}
        </ul>
    </>);
}

export default SidebarList;