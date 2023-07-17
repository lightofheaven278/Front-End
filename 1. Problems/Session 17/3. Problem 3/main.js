class User {
  constructor() {
    this.userName = "";
    this.email = "";
    this.passWord = "";
  }
  inputData() {
    this.userName = document.getElementById("user-name").value;
    this.email = document.getElementById("email").value;
    this.passWord = document.getElementById("password").value;
  }
}
function saveData() {
  let btnSubmit = document.getElementById("submit");
  btnSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    if (validatePass()) {
      let user = new User();
      user.inputData();
      sessionStorage.setItem("User Info", JSON.stringify(user));
      clearForm();
    }
  });
}
saveData();

let pass = document.getElementById("password");
passRetype = document.getElementById("retype-pass");
function validatePass() {
  if (pass.value != passRetype.value) {
    document.getElementById("check-retype").innerHTML =
      "Password does not match";
    return false;
  }
  return true;
}

function clearForm() {
  document.getElementById("user-name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("retype-pass").value = "";
}
