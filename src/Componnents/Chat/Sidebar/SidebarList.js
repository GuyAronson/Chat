// this is a file i used at draft - to not delete
import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import {setFocus, displayTime} from '../../../util.js';
import { addContact, getChatByPartner, getUserChats, invitation } from '../../../fetch';

/**
 *  Fix the addChat function - according to the username and server address + using invitation fetch function
 * Fix handleClickOnChatBox - and providing all messages
 * 
 */

export function SidebarList({user, chats, changeChat, setUserChats}){
    const handleClickOnChatBox = async event =>{
        let partnerUsername = '';
        // console.log(event.target);
        // console.log("ChildNodes: ",event.target.childNodes);

        // Getting the partner username from the element
        if(event.target.tagName === "LI")
            // li->chat-header->div(partnerName)->text->data
            partnerUsername = event.target.firstChild.firstChild.firstChild.data;
        // else if(event.target.tagName === "IMG")
        //     // if the click was on the profile pic, img->div(parent)->div(partnerName)->data
        //     partnerUsername = event.target.parentNode.childNodes[1].firstChild.data;
        else if(event.target.className === "chatPartner")
            // div(partnerName)->text->data
            partnerUsername = event.target.firstChild.data;
        else if (event.target.className.includes("chat-box-header"))
            // chat-header->div(partnerName)->text->data
            partnerUsername = event.target.firstChild.firstChild.data;
        else if(event.target.className === "last-message")
            //div(last-message)->li->chat-header->div(partnerName)->text->data
            partnerUsername = event.target.parentNode.firstChild.firstChild.firstChild.data;
        else if(event.target.className.includes("msg_timeStamp"))
            // if the click is on the timeStamp
            //span(timeStamp)->li->chat-header->div(partnerName)->text->data
            partnerUsername = event.target.parentNode.firstChild.firstChild.firstChild.data;
        
        if(partnerUsername){
            const newChat = await getChatByPartner(user.Username, partnerUsername);
            // console.log("newChat: ", newChat);
            changeChat(newChat);
            setFocus(".msg-input");
        }
    }

    // Set the focus on the input in the add chat pop up
    const handlePopover = ()=>{
        setTimeout(()=>{
            let selector = "#insert_username_input";
            if(document.querySelector(selector)){
                setFocus(selector);
                //Enter click event listener
                document.querySelector("#insert_username_input").addEventListener("keypress", event => {
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
    const addChat = (partnerUsername, partnerNickname, partnerURL) =>{
        if(user.Username === partnerUsername){
            document.querySelector("#insert-chat-popover span").innerHTML = "You can't add yourself!";
            return;
        }
        else if(chats.find(chat=> chat.PartnerID == partnerUsername)){
            document.querySelector("#insert-chat-popover span").innerHTML = "Contact is already exists!";
            return;
        } else{
            // POST request to add a chat to the user && Invitation POST request
            Promise.allSettled([
                addContact(user.Username, partnerUsername, partnerNickname, partnerURL),
                invitation(user.Username, partnerUsername, partnerURL)
            ]).then(async results=>{
                // results is an array of promises contains statuses codes per function executed
                console.log("results:", results);

                if(results[0].value == 200 && results[1].value == 200){
    
                    // Get all chats again
                    let userChats = await getUserChats(user.Username);
                    console.log("userChats: ", userChats);
                    setUserChats(userChats);

                    //Assigning the chat in useState to rerender
                    let chat = userChats.find(chat=> chat.UserID == user.Username && chat.PartnerID == partnerUsername);
                    console.log("Added chat: ", chat);
                    if(chat!= null)
                        changeChat(chat);
                }
                
                document.querySelector(".add-chat-button").click();
            });
        }
    }
    const handleAddChatclick = event=>{
        // Getting the inserted username
        addChat(document.getElementById("insert_username_input").value,
            document.getElementById("insert_nickname_input").value,
            document.getElementById("insert_serveradd_input").value);
    }

    // The add chat popover
    const popoverDown = (
        <Popover id="insert-chat-popover" title="Popover bottom">
            <strong>Insert user to chat with:</strong>
            <input id="insert_username_input" type="text" className="form-control" placeholder="Insert username"/>
            <input id="insert_nickname_input" type="text" className="form-control" placeholder="Insert nickname"/>
            <input id="insert_serveradd_input" type="text" className="form-control" placeholder="Insert server-address"/>
            <span className='error-message d-block small'></span>
            <button className='btn btn-sm btn-primary' id='insert_user_button' onClick={handleAddChatclick}>Enter</button>
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
        <div className='chat-sidebar'>
        <ul className='list-group'>
            <li className = 'list-group-item d-flex justify-content-between align-items-stretch sidebar-header'>
                {/* <img className='profile-pic' src={user.getPicture} alt= "Bruh.."/> */}
                <span className="header-username">{user.Nickname}</span>
                {/* Button to add chats */}
                <OverlayTrigger trigger="click" placement="bottom" overlay={popoverDown} rootClose={true}>
                    <button type="button" className="btn icon-button add-chat-button" onClick={handlePopover}><i className="bi bi-person-plus icon"/></button>
                </OverlayTrigger>
            </li>
            {/* Getting the list of all chats converted into <li></li> */}
            {chats.map((chat, index) => {
                    // Getting the partner username -> get his profile pic
                    let partner = chat.PartnerID;
                    return <li className = 'list-group-item chat-item' key={index} onClick={handleClickOnChatBox}>
                            <div className=' d-flex justify-content-start align-items-start chat-box-header'>
                                {/* profile pic */}
                                {/* <img className='profile-pic-small' src={DataBase.getUserByID(partner).getPicture} alt= "Bruh.."/> */}
                                {/* the name of the person chattin with */}
                                <div className='chatPartner'>{partner}</div>
                            </div>
                            {/* Here will go the last message */}
                            <div className='last-message'>{chat.Messages.length ? chat.Messages[chat.Messages.length-1].Data : ''}</div>
                            {/* Here is the timestamp of the last message */}
                            <span className='position-absolute end-0 m-2 msg_timeStamp'>{chat.Messages.length ? displayTime(chat.Messages[chat.Messages.length-1].Time): ''}</span>
                        </li>
            })}
        </ul>
        </div>
    </>);
}

export default SidebarList;