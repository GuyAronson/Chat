import React, { useLayoutEffect } from 'react';
import {Link} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Navigate } from 'react-router';
import { checkLogin, getUser } from '../../../fetch';


export default function Login({setUser}){
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = async event=>{
        event.preventDefault();
        // document.getElementById("submitLogin").disabled = true
        // setTimeout(()=> document.getElementById("submitLogin").disabled = false, 300);
        if(username != '')
            return;

        let name = event.target.username.value;
        let password = event.target.password.value;
        let robot = event.target.robot.checked;

        let login = await checkLogin(name, password);
        if(!login){
            setError("Invalid Username or Password!");
            return;
        } else if(!robot){
            setError("Make sure you are not a robot!");
            return;
        } else{
            getUser(name).then(thisUser=>{
                if(thisUser){
                    setUser(thisUser);
                    setUsername(name);
                } else
                setError("User was not found!");
                return;
            });
            return;
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
            <Button id="submitLogin" variant="primary" type="submit">
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