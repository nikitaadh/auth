let fullName = document.getElementById("fullname");
let username = document.getElementById("username");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmpassword");

let fullNameError = document.getElementById("fullnameerror");
let usernameError = document.getElementById("usernameerror");
let emailError = document.getElementById("emailerror");
let phoneError = document.getElementById("phoneerror");
let passwordError = document.getElementById("passworderror");

let successText = document.getElementById("successtext");

let registerForm = document.getElementById("registerform");
let registerButton = document.getElementById("registerbutton");

registerButton.addEventListener("click", (e) => {
  let errors = {};

  let fullNamePattern = /^[A-Za-z ]+$/;
  let usernamePattern = /^[a-z0-9_.]+$/;
  let emailPattern =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  let phonePattern =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
  // let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]$/;

  if (fullName.value === "") {
    errors.fullName = "Full Name is required";
  } else if (fullName.value.length > 20) {
    errors.fullName = "Full Name cannot be long than 20 characters";
  } else if (fullName.value.length < 3) {
    errors.fullName = "Full Name cannot be short than 3 characters";
  } else if (!fullNamePattern.test(fullName.value)) {
    errors.fullName = "Invalid Full Name";
  }

  if (username.value === "") {
    errors.username = "Username is required";
  } else if (username.value.length > 20) {
    errors.username = "Username cannot be long than 20 characters";
  } else if (username.value.length < 3) {
    errors.username = "Username cannot be short than 3 characters";
  } else if (!usernamePattern.test(username.value)) {
    errors.username = "Invalid Username";
  }

  if (email.value === "") {
    errors.email = "Email is required";
  } else if (!emailPattern.test(email.value)) {
    errors.email = "Invalid Email";
  }

  if (phone.value === "") {
    errors.phone = "Phone Number is required";
  } else if (!phonePattern.test(phone.value)) {
    errors.phone = "Invalid Phone  Number";
  }

  if (password.value === "") {
    errors.password = "Password is required";
  } else if (password.value.length < 8) {
    errors.password = "Password is too short";
  } else if (password.value.length > 20) {
    errors.password = "Password is too long";
    // } else if (!passwordPattern.test(password.value)) {
    //   errors.password = "Invalid Password";
  } else if (password.value !== confirmPassword.value) {
    errors.password = "Password doesnot match";
  }

  if (Object.keys(errors).length > 0) {
    if (errors.fullName) {
      fullNameError.innerText = errors.fullName;
    } else {
      fullNameError.innerText = "";
    }
    if (errors.username) {
      usernameError.innerText = errors.username;
    } else {
      usernameError.innerText = "";
    }
    if (errors.email) {
      emailError.innerText = errors.email;
    } else {
      emailError.innerText = "";
    }
    if (errors.phone) {
      phoneError.innerText = errors.phone;
    } else {
      phoneError.innerText = "";
    }
    if (errors.password) {
      passwordError.innerText = errors.password;
    } else {
      passwordError.innerText = "";
    }
  }

  if (Object.keys(errors).length === 0) {
    fullNameError.innerText = "";
    usernameError.innerText = "";
    emailError.innerText = "";
    phoneError.innerText = "";
    passwordError.innerText = "";
    successText.innerText = "Registration successful";
  }
});
