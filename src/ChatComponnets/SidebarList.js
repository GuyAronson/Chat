import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
// import Banner from '../banner.js';
// import { getLoggedUser } from '../users.js';
// import {Link} from 'react-router-dom';
// import { AddChat } from './AddChat.js';

export function SidebarList(props){
    const user = props.user;

    return (<>
        {/* The chats list */}
        <ul className='list-group'>
            <li className = 'list-group-item d-flex justify-content-between'>
                <div className="ms-2 fw-bold">{user._username}</div>
                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="bi bi-person-plus icon"/>
                </button>
            </li>
            {user._chats.map((chat, index) => {
                    return <li className = 'list-group-item d-flex justify-content-between align-items-start' key={index}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{user._username == chat.UserID1() ? chat.UserID2(): chat.UserID1()}</div>
                                {/* Here will go the last message */}
                                {chat.messages()[0].data()}
                            </div>
                            {/* Here is the timestamp of the last message */}
                            <span className='position-absolute end-0 bottom-0 m-2'>{chat.messages()[0].timeStamp()}</span>
                            <span className="badge bg-primary rounded-pill">1{/* Here will go the num of the updates */}</span>
                        </li>
            })}
        </ul>
    </>);
}

export default SidebarList;