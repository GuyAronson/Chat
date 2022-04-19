import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router';
import Banner from '../banner.js';
import SidebarList from './SidebarList';

var loggedUser = null;
export var getLoggedUser = () => loggedUser;
export var setLoggedUser = user =>loggedUser = user;

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state={
            logout: false
            
        }
        this.Logout = this.Logout.bind(this);        

    }
    Logout(event){
        setLoggedUser(null);
        console.log("user changed");
        this.setState({logout: true});
    }
    render(){
        return(
            <>
                {/* Navigate back to the login page if the logout was selected */}
                {this.state.logout && <Navigate to='/login' replace={true}/> }

                {/* The chat page */}
                <div><Banner/></div>
                {/* Hello & logout button */}
                {getLoggedUser()._nickname && <blockquote id='hello' className="blockquote">Hello, {getLoggedUser()._nickname}</blockquote>}
                <button className='mb-3 btn btn-lg btn-light logout' onClick={this.Logout}>Logout</button>

                {/* Sidebar of chats */}
                <div id='container-recipients'>
                    {getLoggedUser() && <SidebarList user={getLoggedUser()}/>}                    
                </div>

                {/* Chat body */}
                

            </>
        );
    }
}

export default Chat;