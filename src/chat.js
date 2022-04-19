import React from 'react';
import { Database } from './Database/index'
import { useLocation } from 'react-router-dom'

export const Chat = () => {
    const location = useLocation();
    console.log(location);
    if (!location.state) {
        const users = location.state?.users;
        Database.Server.users = users;
    }
    return (
        <h1>This is the chat!{Database.Server.getUsers().map(user => console.log(user))}</h1>
    );
}