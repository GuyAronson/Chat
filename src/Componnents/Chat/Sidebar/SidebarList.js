// this is a file i used at draft - to not delete
import React from 'react';
import DataBase from '../../../Database/DataBase';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Database } from '../../../Database';
import {setFocus} from '../../../util.js';

export function SidebarList({user, chats, changeChat, setUserChats}){
    const handleClickOnChatBox = event =>{
        let partnerUsername = '';
        // Getting the partner username from the element
        if(event.target.tagName === "LI")
            // li->div->div(partnerName)->data
            partnerUsername = event.target.firstChild.childNodes[1].firstChild.data;
        else if(event.target.tagName === "IMG")
            // if the click was on the profile pic, img->div(parent)->div(partnerName)->data
            partnerUsername = event.target.parentNode.childNodes[1].firstChild.data;
        else if(event.target.className === "chatPartner")
            partnerUsername = event.target.firstChild.data;
        else if (event.target.className === "chat-box-header")
            // div->div(partnerName)->data
            partnerUsername = event.target.childNodes[1].firstChild.data;
        else if(event.target.className === "last-message")
            //div(last-message)->li->div->div(userName)->data
            partnerUsername = event.target.parentNode.firstChild.childNodes[1].firstChild.data;
        else if(event.target.className.includes("msg_timeStamp"))
            // if the click is on the timeStamp
            //span(timeStamp)->li->div->div(userName)->data
            partnerUsername = event.target.parentNode.firstChild.childNodes[1].firstChild.data;

        if(partnerUsername){
            const newChat = Database.Server.getChatByBothUsers(user.getUsername, partnerUsername);
            changeChat(newChat);
            setFocus(".msg-input");
        }
    }

    // Set the focus on the input in the add chat pop up
    const handlePopover = ()=>{
        setTimeout(()=>{
            let selector = "#insert-user-input";
            if(document.querySelector(selector)){
                setFocus(selector);
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
        }, 30)
    }

    //Adding a new chat to the list of the user's chats
    const addChat = partnerUsername =>{
        if(user.getUsername === partnerUsername){
            document.querySelector("#insert-chat-popover span").innerHTML = "You can't add yourself!";
            return;
        }
        if(DataBase.queryUserName(partnerUsername)){
            // Create new chat - the creation function returns the created chat
            let chat = DataBase.createNewChat([], user.getUsername, partnerUsername);
            console.log("newChat: ", chat);
            // add the chat id to both of the users
            user.addChat(chat.id);
            let partner = DataBase.getUserByID(partnerUsername);
            partner.addChat(chat.id);

            // set the user chats - the new list
            let userChats = Database.Server.getChats(user.getUsername);
            setUserChats(userChats);

            //Assigning the chats in useState to rerender
            changeChat(chat);

            // document.body.click();
            document.querySelector(".add-chat-button").click();
        }
        else
            document.querySelector("#insert-chat-popover span").innerHTML = "Wrong username!";
    }
    const handleAddChatclick = event=>{
        // Getting the inserted username
        addChat(document.getElementById("insert-user-input").value);
    }

    // The add chat popover
    const popoverDown = (
        <Popover id="insert-chat-popover" title="Popover bottom">
            <strong>Insert user to chat with:</strong>
            <input id="insert-user-input" type="text" className="form-control" placeholder="Insert username"/>
            <span className='error-message d-block small'></span>
            <button className='btn btn-sm btn-primary' id='insert-user-button' onClick={handleAddChatclick}>Enter</button>
        </Popover>
    );

    function displayLastMessage(message) {
        let type = message.type
        if (type === "text") {
            return message.data;
        } else if (type === "image") {
            return "image";
        } else if (type === "video") {
            return "video";
        } else {
            return "recording";
        }
    }

    return (<>
        {/* The chats list on the left side */}
        <ul className='list-group chat-sidebar'>
            <li className = 'list-group-item d-flex justify-content-between align-items-stretch'>
                <img className='profile-pic' src={user.getPicture} alt= "Bruh.."/>
                <span className="header-username">{user.getNickName}</span>
                {/* Button to add chats */}
                <OverlayTrigger trigger="click" placement="bottom" overlay={popoverDown} rootClose={true}>
                    <button type="button" className="btn icon-button add-chat-button" onClick={handlePopover}><i className="bi bi-person-plus icon"/></button>
                </OverlayTrigger>
            </li>
            {/* Getting the list of all chats converted into <li></li> */}
            {chats.map((chat, index) => {
                    // Getting the partner username -> get his profile pic
                    let partner = chat._userID1 === user.getUsername? chat.userID2: chat.userID1;
                    return <li className = 'list-group-item chat-item' key={index} onClick={handleClickOnChatBox}>
                            <div className=' d-flex justify-content-start align-items-start chat-box-header'>
                                {/* profile pic */}
                                <img className='profile-pic-small' src={DataBase.getUserByID(partner).getPicture} alt= "Bruh.."/>
                                {/* the name of the person chattin with */}
                                <div className='chatPartner'>{user._username === chat.userID1 ? chat.userID2: chat.userID1}</div>
                            </div>
                            {/* Here will go the last message */}
                            <div className='last-message'>{chat.messages.length ? displayLastMessage(chat.messages[chat.messages.length-1]) : ''}</div>
                            {/* Here is the timestamp of the last message */}
                            <span className='position-absolute end-0 m-2 msg_timeStamp'>{chat.messages.length ? chat.messages[chat.messages.length-1].timeStamp : ''}</span>
                        </li>
            })}
        </ul>
    </>);
}

export default SidebarList;