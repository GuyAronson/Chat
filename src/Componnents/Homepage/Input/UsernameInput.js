import React from 'react';

export const UsernameInput = () => {
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

export default UsernameInput;