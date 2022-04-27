import React from 'react';
import Login from './login.js';

export const LoginPage = ({setUser}) => {
        return(
            <div className='content form'>
                <Login setUser={setUser}/>
            </div>
        );
}

export default LoginPage;