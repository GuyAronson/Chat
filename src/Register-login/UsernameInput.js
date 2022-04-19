import React from 'react';
import ReactDOM from 'react-dom/client';

class UsernameInput extends React.Component{

    render(){
        return(
            <>
                <div className="mb-3 tab tab-right">
                    <label className='form-label'>Username</label>
                    <input type="text" id="usernameInput" className="form-control"/>
                    <div id="usernameErrorMessage" className="form-text error-message"></div>
                </div>
            </>
        )
    }
}

export default UsernameInput;