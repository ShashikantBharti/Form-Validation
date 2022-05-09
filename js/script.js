/*
    Get all necessary fields
*/
const form = document.getElementById('form'),
    username = document.getElementById('username'),
    email = document.getElementById('email'),
    password1 = document.getElementById('password'),
    password2 = document.getElementById('re-password');

/*
    Function to show errors
*/
function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
    return false;
}

/*
    Function if value is valid then show effect
*/
function showSuccess(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control success';
    small.innerText = message;
    return true;
}

/*
    Change string to title case
*/
function titleCase(input) {
    return input.split(' ').map(item => item.charAt(0).toUpperCase()+item.substring(1).toLowerCase()).join(' ');
}

/*
    Changes string to sentence case
*/
function sentenceCase(input) {
    return input.charAt(0).toUpperCase()+input.substring(1).toLowerCase();
}

/*
    Get the name of field
*/
function getFieldName(input) {
    return titleCase(input.id);
}

/*
    Validate text fields
*/
function validateText(text) {
    let re = /\d/;
    if(text.value === '') {
        showError(text, `${getFieldName(text)} is required!`);
    } else if(text.value.length <3 ) {
        showError(text, `${getFieldName(text)} must be at least 3 characters!`);
    } else if(text.value.length > 15) {
        showError(text, `${getFieldName(text)} must not exceed more than 15 characters!`);
    } else if(re.test(text.value)) {
        showError(text, `${getFieldName(text)} should not contain number!`);
    } else if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(text.value)) {
        showError(text, `${getFieldName(text)} should not contain special characters!`);
    } else {
        showSuccess(text);
    }
}

/*
    Validate emails
*/
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.value === '') {
        showError(email, `${getFieldName(email)} is required!`);
    } else if(!re.test(email.value.trim())) {
        showError(email, `${getFieldName(email)} is Invalid!`);
    } else {
        showSuccess(email);
    }
}

/*
    Validate password
*/
function validatePassword(password) {
    if(password.value === '') {
        showError(password, `${getFieldName(password)} is required!`); 
    } else if(password.value.length < 8) {
        showError(password, `${getFieldName(password)} must be atleast 8 characters!`);
    } else if(password.value.length > 15){
        showError(password, `${getFieldName(password)} must not more than 15 characters!`);
    } else if(!/[A-Z]/.test(password.value)) {
        showError(password, `${getFieldName(password)} required atleast one capital letter!`); 
    } else if(!/[a-z]/.test(password.value)) {
        showError(password, `${getFieldName(password)} required atleast one small letter!`);
    } else if(!/\d/.test(password.value)) {
        showError(password, `${getFieldName(password)} required atleast one digit!`);
    } else if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password.value)) {
        showError(password, `${getFieldName(password)} required atleast one special character!`);
    } else {
        showSuccess(password);
    }
}

/*
    Match confirm password
*/
function matchPassword(password1, password2) {
    if(password1.value !== password2.value) {
        showError(password2, `${getFieldName(password1)} does not match!`);
    } else {
        showSuccess(password2);
    }
}


/*
    Validate username on blur
*/
username.addEventListener('blur', function() {
    validateText(username);
});

/*
    Validate email on blur
*/
email.addEventListener('blur', function(){
    validateEmail(email);
});

/*
    Validate password1 on blur
*/
password1.addEventListener('blur', function() {
    validatePassword(password1);
});

/*
    match confirm password on blur
*/
password2.addEventListener('blur', function() {    
    if(password2.value === '' ) {
        showError(password2, `${getFieldName(password1)} is required`);
    } else {
        matchPassword(password1, password2);
    }
});


/*
    Validate all fields on form submit
*/
form.addEventListener('submit', function(e){
    e.preventDefault();
    validateText(username);
    validateEmail(email);
    validatePassword(password1);
    if(password2.value === '' ) {
        showError(password2, `${getFieldName(password1)} is required`);
    } else {
        matchPassword(password1, password2);
    }
});