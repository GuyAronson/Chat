import ProfilePicInput from './ProfiePicInput.js';
import {users} from './users.js';

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
    let mail = event.target.emailInput.value;
    let nickname = event.target.nicknameInput.value;
    let password1 = event.target.passwordInput.value;
    let password2 = event.target.passwordConfirmInput.value;
    let username = event.target.usernameInput.value;

    //Checks Usermame
    if(username.length != 0){
        document.querySelector('#usernameErrorMessage').innerHTML = "";    

        //Checks mail
        if(validateEmail(mail)){
            document.querySelector('#emailErrorMesage').innerHTML = "";    

            //Checks password
            if(validatePassword(password1)){
                document.querySelector('#passErrorMesage').innerHTML = "";

                //Checks password confirmation
                if(password1 == password2){    
                    document.querySelector('#passConfirmErrorMesage').innerHTML = "";    

                    // Checks robot validation:
                    if(event.target.checkRobot.checked){

                        // Insert to DB
                        let newUser = {
                            "username": username,
                            "mail":     mail,
                            "password": password1,
                            "nickname": nickname,
                            "messages": []
                        }
                        let url = document.querySelector("#profileThumbnail").getAttribute('src');
                        if(url)
                        newUser.profilePic = url;
                        insertUser(newUser);
                        
                    } else
                        document.querySelector('#checkRobot').style.outline = "1px solid red";
                } else
                    document.querySelector('#passConfirmErrorMesage').innerHTML = "Passwords does not match";    
            } else
                document.querySelector('#passErrorMesage').innerHTML = "Password is invalid.";   
        } else
            document.querySelector('#emailErrorMesage').innerHTML = "Mail is invalid.";
    } else
        document.querySelector('#usernameErrorMessage').innerHTML = "Username is invalid.";           

}

//Gets user object and adds it to the DB
export function insertUser(user){
    users.push(user);
    console.log("users: ", users);
}
