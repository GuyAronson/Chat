/* Function gets email and validate it
    return true/false for validation    */
function validateEmail(email){
    alert("hey");
    var mailformat = new RegExp('^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$');
    if(email.value.match(mailformat))
    {
        alert("You have entered a valid email address!");    //The pop up alert for a valid email address
        return true;
    }else{
        alert("You have entered an invalid email address!");    //The pop up alert for an invalid email address
        return false;
    }
}

/* Function gets password and validate it - at least 8 letters
    return true/false for validation*/
function validatePassword(pass){
    var passw= new RegExp('^[A-Za-z]\w{7,14}$');
    if(inputtxt.value.match(passw)) { 
        alert('Correct, try another...')
        return true;
    } else { 
        alert('Wrong...!')
        return false;
    }
}