import { Database } from './Database'
/* Function gets email and validate it
    checks @ and . locations
    return true/false for validation    */
export function validateEmail(email){
    var atposition=email.indexOf("@");  
    var dotposition = email.lastIndexOf(".");
    if (atposition <= 1 || dotposition <= atposition+2 || dotposition + 2 >= email.length){
        console.log("mail is invalid");
        return false;
    }else{
        return true;
    }
}

/* Function gets password and validate it - at least 7 letters
    return true/false for validation*/
export function validatePassword(password){
    if(password.length>=7) { 
        return true;
    } else {
        console.log("password is invalid");
        return false;
    }
}
// Gets a form onSubmit event and checks validation - add the user to the DB if the form is valid
export function checkValidation(event){
    event.preventDefault();
    const email = event.target.emailInput.value;
    const nickname = event.target.nicknameInput.value;
    const password = event.target.passwordInput.value;
    const matchPassword = event.target.passwordConfirmInput.value;
    const username = event.target.usernameInput.value;
    const isHuman = event.target.checkRobot.checked;
    let formIsValid = true
    clearErrors()
    if(!username || username.length === 0) {
        document.querySelector('#usernameErrorMessage').innerHTML = "Username is invalid.";
        formIsValid = false;
    }
    if (Database.queryUsername(username)) {
        document.querySelector('#usernameErrorMessage').innerHTML = "Username is already taken.";
        formIsValid = false;
    }

    if(!email || !validateEmail(email)) {
        document.querySelector('#emailErrorMesage').innerHTML = "E-Mail is invalid.";
        formIsValid = false;
    }
    if(Database.queryEmail(email)) {
        document.querySelector('#emailErrorMesage').innerHTML = "E-Mail is already taken.";
        formIsValid = false;
    }

    if(!password || !validatePassword(password)) {
        document.querySelector('#passErrorMesage').innerHTML = "Password is invalid. Need to be greater then 7 characters";
        formIsValid = false;
    }

    if(!matchPassword || password !== matchPassword) {
        document.querySelector('#passConfirmErrorMesage').innerHTML = "Passwords does not match";
        formIsValid = false;
    }
    if(!isHuman) {
        document.querySelector('#checkRobot').style.outline = "1px solid red";
        formIsValid = false;
    }

    if(formIsValid) {
        var profilePicture = document.querySelector("#profileThumbnail").getAttribute('src') || '';
        var user = new Database.User({username, email, password, nickname, profilePicture})
        Database.Server.addUser(user);
    }

    Database.Server.getUsers();
}

//Gets user object and adds it to the DB
// export function insertUser(user){
//     users.push(user);
//     console.log("users: ", users);
// }


const clearErrors = () => {
    document.querySelector('#usernameErrorMessage').innerHTML = ""; 
    document.querySelector('#emailErrorMesage').innerHTML = "";    
    document.querySelector('#passErrorMesage').innerHTML = "";
    document.querySelector('#passConfirmErrorMesage').innerHTML = "";
    document.querySelector('#checkRobot').style.outline = "";  
}