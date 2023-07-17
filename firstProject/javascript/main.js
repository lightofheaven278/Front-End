let btnLogin = document.getElementById("login");
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  let email = document.getElementById("user-email").value;
  let password = document.getElementById("password").value;
  let checkLogin = checkUserInfo(email, password);
  if (checkLogin) {
    localStorage.setItem("Logged-in User", email);
    window.location.href =
      "http://127.0.0.1:5500/firstProject/html/dashBoard.html";
  } else {
    alert("Please check email or password");
  }
});

function checkUserInfo(email, password) {
  let userSystem = localStorage.getItem("User Data")
    ? JSON.parse(localStorage.getItem("User Data"))
    : [];
  for (let i = 0; i < userSystem.length; i++) {
    if (userSystem[i].email == email && userSystem[i].password == password) {
      return true;
    }
    return false;
  }
}
