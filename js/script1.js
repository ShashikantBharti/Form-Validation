const form = document.getElementById('form'),
      username = document.getElementById('username'),
      email = document.getElementById('email'),
      password = document.getElementById('password'),
      repassword = document.getElementById('re-password');

// Show Error Message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
    return false;
}

// Show Success
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    const small = formControl.querySelector('small');
    small.innerText = '';
    return true;
}

// Check if email is valid      
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email.value.trim())) {
        showError(email, 'Email is Invalid!');
    } else {
        showSuccess(email);
    }
}

// Convert String to Title Case
function titleCase(string) {
    return string.replace(/\b[a-z]/g, (x) => x.toUpperCase());
}

// Convert Sentence Case
function sentenceCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    
// Get field Name
function getFieldName(input) {
    return titleCase(input.id);
}

// Check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input, index){
        if(input.value.trim() === '') {
            let message = `${getFieldName(input)} is required!`;
            showError(input, message);
        } else {
            showSuccess(input);
        }
    }); 
}
      
// Check Length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be minimum ${min} character`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must not exceed ${max} character`);
    } else {
        showSuccess(input);
    }
}


// Match Password
function matchPassword(password1, password2){
    if(password1.value !== password2.value) {
        showError(password2, `${getFieldName(password2)}  is not matched!`);
    } else {
        showSuccess(password2);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkRequired([username, email, password, repassword]);
    if(username.value !== '') {
        checkLength(username, 3, 15);
    }
    if(password.value !== '') {
        checkLength(password, 8, 15);
        matchPassword(password, repassword);    
    }

    if(email.value !== '') {
        isValidEmail(email);
    }
    
});
