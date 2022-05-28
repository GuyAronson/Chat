import React from 'react';
import Login from './Login.js';

export const LoginPage = ({setUser}) => {
        return(
            <div className='content form'>
                <Login setUser={setUser}/>
            </div>
        );
}

export default LoginPage;