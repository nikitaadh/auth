const userInfo = JSON.parse(localStorage.getItem('userInfo'));

let loginBtn = document.getElementById('loginbtn');
let userContainer = document.getElementById('usercontainer');

if (!userInfo) {
  window.location.href =
    location.protocol + '//' + location.host + '/client/login/index.html';
} else {
  userContainer.innerText = userInfo.fullname;
}

loginBtn.addEventListener('click', () => {
  localStorage.removeItem('userInfo');
  window.location.href =
    location.protocol + '//' + location.host + '/client/login/index.html';
});
