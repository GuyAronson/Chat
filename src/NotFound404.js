import React from 'react';
import ReactDOM from 'react-dom/client';
import Banner from './banner.js';

function NotFound404(){
    
    return(<>
        <h1>404, Cant find this page!</h1><br/>
        <input type="button" onClick={()=>window.location.href = '/login'} value="Go to login"/>
    </>);
}

export default NotFound404;