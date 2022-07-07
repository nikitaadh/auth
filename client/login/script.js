const API_BASE_URL = 'http://localhost:3001/api';

let email = document.getElementById('email');
let password = document.getElementById('password');

let emailError = document.getElementById('emailerror');
let passwordError = document.getElementById('passworderror');

let helperText = document.getElementById('helpertext');

let loginForm = document.getElementById('loginform');
let loginButton = document.getElementById('loginbutton');

loginButton.addEventListener('click', (e) => {
  let errors = {};

  let emailPattern =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  //   let passwordPattern = "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$";

  if (email.value === '') {
    errors.email = 'Email is required';
  } else if (!emailPattern.test(email.value)) {
    errors.email = 'Invalid Email';
  }

  if (password.value === '') {
    errors.password = 'Password is required';
  } else if (password.value.length < 8) {
    errors.password = 'Password is too short';
  } else if (password.value.length > 20) {
    errors.password = 'Password is too long';
    //   } else if (!passwordPattern.test(password.value)) {
    //     errors.password = "Invalid Password";
  }

  if (Object.keys(errors).length > 0) {
    if (errors.email) {
      emailError.innerText = errors.email;
    } else {
      emailError.innerText = '';
    }
    if (errors.password) {
      passwordError.innerText = errors.password;
    } else {
      passwordError.innerText = '';
    }
  }

  if (Object.keys(errors).length === 0) {
    emailError.innerText = '';
    passwordError.innerText = '';
    loginUser();
  }
});

const loginUser = async () => {
  try {
    await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          helperText.innerText = data.message;
          helperText.style.color = 'green';
          email.value = '';
          password.value = '';
          window.location.href =
            location.protocol + '//' + location.host + '/client/index.html';
        }
        if (data.status === 'fail') {
          helperText.innerText = data.message;
          helperText.style.color = 'red';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
