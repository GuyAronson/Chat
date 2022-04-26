import React from 'react';
import ReactDOM from 'react-dom/client';
import Banner from '../banner.js';
import Login from './login.js';

class LoginPage extends React.Component{
    render(){
        return(
            <div className='content form'>
                <Login/>
            </div>
        );
    }
}

export default LoginPage;