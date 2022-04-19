import React from 'react';
import ProfilePicInput from './ProfiePicInput.js';
import PasswordInput from './PasswordInput.js';
import UsernameInput from './UsernameInput.js';
import { checkValidation } from './util'
import { useNavigate } from 'react-router-dom'

// no need for Register to be a class component - it is stateless
export const Register = () => {
    const navigate = useNavigate();
    const onSubmit = (event) => {
        event.preventDefault()
        const users = checkValidation(event)
        console.log(users);
        // pass the users to the chat page
        navigate('Chat', {state:{users}})
    }
    return(
        <>
        <form onSubmit={onSubmit}>
            <h2 className="topic">Register</h2>
            <UsernameInput />
            {/* email input */}
            <div className="mb-3 tab tab-right">
                <label className='form-label'>Email address</label>
                <input type="email" id="emailInput" className="form-control" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                <div id="emailErrorMesage" className="form-text error-message"></div>
            </div>
            {/* nickname input */}
            <div className="mb-3 tab tab-right">
                <label className="form-label">Nickname</label>
                <input type="text" id="nicknameInput" className="form-control" />
            </div>
            {/* Password input */}
            <PasswordInput/>
            {/* ProfilePic input */}
            <ProfilePicInput/>
            {/* Robot input */}
            <div className="mb-3 form-check tab">
                <input id="checkRobot" type="checkbox" className="form-check-input"/>
                <label className="form-check-label">Confirm you're not a robot</label>
            </div>
            {/* Submit */}
            <div className="col-xs-1 text-center">
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                <div className='hr-trick'>or</div>
                <a href='loginPage.js' className="btn btn-light btn-lg">Login</a>
            </div>
        </form>
        </>
    );
}