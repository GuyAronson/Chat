// File for fetch functions
export const reviewURL = "https://localhost:7001";
export const server = "https://localhost:7000";
const api = "/api";
const serverUrl = server+api;

/************************************************
 * All POST requests return the status code
 *************************************************/

// function fetches all users and returns a promise resolving the list of users
export const allUsers = async ()=>{
    return fetch(`${serverUrl}/contacts/users`,{method:'GET', Accept: 'application/json'}).then(response=>{
        return response.json().then(result=> result);
    });
}

export const getChatByPartner = async (username ,partnerName) => {
    const chats = await getUserChats(username);
    // const chats = await response.json();
    const selectedChat = chats.find(chat => chat.PartnerID === partnerName);
    return selectedChat;
}
export const getUser = async username => {
    let users = await allUsers();
    // console.log(response);
    // let users = await response.json();
    return users.find(user=> user.Username == username);
}
// add message to user
export const addMessage = async (username, partner, data) => {
    const res = await fetch(`${serverUrl}/contacts/${partner}/messages?currentUser=${username}&data=${data}`,{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
        // body: JSON.stringify({username: username, partner: partner, data: data})
    });
    return res.status;
}

//transfer request
export const sendMessage = async (partner, url, username, data) => {
    const res = await fetch(`${url}${api}/transfer?username=${partner}&partner=${username}&data=${data}`,{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
        // body: JSON.stringify({username: partner, partner: username, data: data})
    });
    return res.status;
}

export const getContacts = async username => {
    return fetch(`${serverUrl}/contacts`,{method:'GET'}).then(response=>{
        return response.json().then(result=> result);
    });
}

export const addContact = async (username, partnerUsername, nickname, partnerURL) => {
    // Using the api/contacts POST request - adding a new Partner and creating new Chat
    let partner ={
        Username : partnerUsername,
        Nickname : nickname,
        ServerAddress : partnerURL
    };
    const res = await fetch(`${serverUrl}/contacts?currentUser=${username}`,{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(partner)
    });
    return res.status;
}

export const invitation = async (username, partner, partnerURL, nickname) => {
    const res = await fetch(`${partnerURL}${api}/invitations?username=${partner}&partner=${username}&serverAdd=${server}`,{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
        // body: JSON.stringify({username: partner, partner: username,serverAdd: serverUrl,  nickname: nickname})
    });
    return res.status;
}

export const isUserExists = async (username)=>{
    let c = await getUser(username);
    console.log("Fetched user: ", c);
    return c ? true : false;
}

export const createUser = async (username, nickname, password, email)=>{
    const res = await fetch(`${serverUrl}/register?username=${username}&nickname=${nickname}&password=${password}&email=${email}`,{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, nickname: nickname, password: password, email: email})
    });
    if(res.status == 200)
        return {Username: username, Nickname: nickname,  Password: password, Email: email, Chats:[]};
    else return null;

}


export const checkLogin = async (username, password)=>{
    return fetch(`${serverUrl}/login?username=${username}&password=${password}`, {method:'GET'})
    .then(async res=>{
        return res.json().then(result=> result);
    });
}

// Function fetches all user's chats and returns a promise resolving it
export const getUserChats = async (username)=>{
    return fetch(`${serverUrl}/contacts/chats?currentUser=${username}`,{method:'GET'})
    .then(res=>{
        if(res.status == 404)
            return null;
        return res.json().then(result=> result);
    });
}

export const getChatByID = async (username, id) => {
    const response = await getUserChats(username);
    const chats = await response.json();
    return chats.find(chat => chat.ID == id);
}

//Function gets all messages between current user and the partner, returns a promise of array of the messages
export const getMessages = (currentUser, partner)=>{
    return fetch(`${serverUrl}/contacts/${partner}/messages/?currentUser=${currentUser}`, {method:'GET'}).then(response=>{
        return response.json().then(result=>result);
    });
}

export const goReview = ()=>{
    window.location.href = reviewURL;
}
