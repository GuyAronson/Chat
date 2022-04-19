import React from 'react';
import { Card } from 'react-bootstrap';

export default function ChatHeader(props){
    return(<>
        <Card>
            <Card.Header>
                {/* Need to add a profile pic */}
                Chat with {props.partner}
            </Card.Header>
        </Card>
    </>);
}