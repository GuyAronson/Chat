import React from 'react';

export const Layout = () => {
        return(
            <form className='form pb-4'>
                <h2 className = "topic">Welcome!</h2>
                <div className="col-xs-1 text-center">
                    <a href='/register' id='register-button' className="btn btn-primary btn-lg">Register</a>
                    <a href='/login' className="btn btn-light btn-lg">Login</a>
                </div>
            </form>
        );
}

export default Layout;