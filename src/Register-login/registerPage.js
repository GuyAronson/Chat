import React from 'react';
import Register from './register.js';

export const RegisterPage = ({setUser}) => {
        return(
            <div className='content'>
                <div className='form'><Register setUser={setUser}/></div>
            </div>
        );
}

export default RegisterPage;