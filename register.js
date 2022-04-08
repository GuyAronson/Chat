import React from 'react';
import ReactDOM from 'react-dom/client';

class Register extends React.Component{
    render(){
        return(
            <>
            <form>
                <div class="mb-3 tab tab-right">
                    <label className='form-label tab'>Email address</label>
                    <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp"/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    <div id="emailErrorMesage" className="form-text error-message"></div>
                </div>
                <div class="mb-3 tab tab-right">
                    <label class="form-label tab">Nickname</label>
                    <input type="text" class="form-control" id="nicknameInput"/>
                </div>
                <div class="mb-3 tab tab-right">
                    <label class="form-label tab">Password</label>
                    <input type="password" class="form-control" id="passwordInput"/>
                    <div id="passErrorMesage" className="form-text error-message"></div>
                </div>
                <div class="mb-3 form-check tab">
                    <input type="checkbox" class="form-check-input" id="checkRobot"/>
                    <label class="form-check-label">Confirm you're not a robot</label>
                </div>
                <div className="col-xs-1 text-center">
                    <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                    <div className='hr-trick'>or</div>
                    <button type="submit" class="btn btn-light btn-lg">Login</button>
                </div>            
            </form>
        </>
        );
    }
}

export default Register;