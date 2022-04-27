import React from 'react';
import {Link} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Navigate } from 'react-router';
import { DataBase } from '../Database/DataBase.js';


export default function Login({setUser}){
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = event=>{
        event.preventDefault();
        // let navigate = useNavigate();

        let username = event.target.username.value;
        let password = event.target.password.value;
        let robot = event.target.robot.checked;
        console.log(DataBase.getUsers());
        if(!DataBase.queryUserName(username) || !DataBase.queryPassword(password, username)){
            setError("Invalid Username or Password!");
            return;
        } else if(!robot){
            setError("Make sure you are not a robot!");
            return;
        } else{
            let thisUser = DataBase.getUserByID(username);
            if(thisUser){
                setUsername(username);
                setUser(DataBase.getUserByID(username));
            } else
                setError("User was not found!");
        }
    }

    return(<>
        {/* Navigate to the chat if the login worked */}
        {username && <Navigate to={`/chat/${username}`} replace={true}/>}

        <Form onSubmit={handleLogin}>
            <div className='text-center h1'>
                <u>Login</u>
            </div>
            {/* Set an error message */}
            {error && <p className='text-center text-danger'>{error}</p>}
        <Form.Group className="tab tab-right mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="tab tab-right mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="tab mb-3" controlId="robot">
            <Form.Check type="checkbox" label="Robot check" />
        </Form.Group>
        <div className="text-center">
            <Button  variant="primary" type="submit">
                Submit
            </Button>
            <div className='hr-trick'>or</div>
            <Link to='/register'><Button className='mb-3' variant="light" type="submit">
                Register
            </Button></Link>
        </div>
        </Form>
    </>);
}