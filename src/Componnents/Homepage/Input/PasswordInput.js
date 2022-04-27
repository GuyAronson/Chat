import React from 'react';

export const PasswordInput = () => {
        return(
            <>
                {/* Password input */}
                <div className="mb-3 tab tab-right">
                    <label className="form-label">Password</label>
                    <input type="password" id="passwordInput" className="form-control" />
                    <div id="passErrorMesage" className="form-text error-message"></div>
                </div>
                {/* Password confirmation input */}
                <div className="mb-3 tab tab-right">
                    <label className="form-label">Password confirmation</label>
                    <input type="password" id="passwordConfirmInput" className="form-control" />
                    <div id="passConfirmErrorMesage" className="form-text error-message"></div>
                </div>
            </>
        )
}

export default PasswordInput;