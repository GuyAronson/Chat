import React from 'react';
import ReactDOM from 'react-dom/client';
import Banner from '../banner.js';
import Register from './register.js';

class RegisterPage extends React.Component{
    render(){
        return(
            <div className='content'>
                <div className='form'><Register/></div>
            </div>
        );
    }
}

export default RegisterPage;