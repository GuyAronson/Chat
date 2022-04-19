import React from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import ChatHeader from './ChatHeader.js';
import ChatBody from './ChatBody';

export class ChatWindow extends React.Component{


    render(){
        return(<>
            <Container>
                <ChatHeader partner={this.props.partner}/>
                {/* The messages go there - needs to design */}
                <ChatBody partner={this.props.partner}/>
                {/* Here will come the ChatFooter (with the buttons and inputs) */}
            </Container>
        </>);
    }
}

export default ChatWindow;