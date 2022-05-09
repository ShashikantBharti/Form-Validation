const form = document.getElementById('form'),
      username = document.getElementById('username'),
      email = document.getElementById('email'),
      password = document.getElementById('password'),
      repassword = document.getElementById('re-password');

// Functions
function showError(input, message) {
    const formControl = input.parentElement;
    // formControl.classList.add('error');
    // formControl.classList.remove('success');
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    // formControl.classList.add('success');
    // formControl.classList.remove('error');
    formControl.className = 'form-control success';

}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Event Listener      
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (username.value === '') {
        showError(username, 'Username is required!');
    } else {
        showSuccess(username);
    }

    if (email.value === '') {
        showError(email, 'Email is required!');
    } else if(!isValidEmail(email.value)){
        showError(email, 'Email is invalid!');
    } else {
        showSuccess(email);
    }

    if (password.value === '') {
        showError(password, 'Password is required!');
    } else {
        showSuccess(password);
    }

    if (repassword.value === '') {
        showError(repassword, 'Re-Enter your Password!');
    } else if(password.value !== repassword.value){
        showError(repassword, 'Password not matched!');
    } else {
        showSuccess(repassword);
    }

});