let email = document.getElementById("email");
let password = document.getElementById("password");

let emailError = document.getElementById("emailerror");
let passwordError = document.getElementById("passworderror");

let successText = document.getElementById("successtext");

let loginForm = document.getElementById("loginform");
let loginButton = document.getElementById("loginbutton");

loginButton.addEventListener("click", (e) => {
  let errors = {};

  let emailPattern =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  //   let passwordPattern = "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$";

  if (email.value === "") {
    errors.email = "Email is required";
  } else if (!emailPattern.test(email.value)) {
    errors.email = "Invalid Email";
  }

  if (password.value === "") {
    errors.password = "Password is required";
  } else if (password.value.length < 8) {
    errors.password = "Password is too short";
  } else if (password.value.length > 20) {
    errors.password = "Password is too long";
    //   } else if (!passwordPattern.test(password.value)) {
    //     errors.password = "Invalid Password";
  }

  if (Object.keys(errors).length > 0) {
    if (errors.email) {
      emailError.innerText = errors.email;
    } else {
      emailError.innerText = "";
    }
    if (errors.password) {
      passwordError.innerText = errors.password;
    } else {
      passwordError.innerText = "";
    }
  }

  if (Object.keys(errors).length === 0) {
    emailError.innerText = "";
    passwordError.innerText = "";
    successText.innerText = "Login successful";
  }
});
