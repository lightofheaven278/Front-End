let userName = document.getElementById("user");
// console.log(userName);
let btnAdd = document.getElementById("add");
btnAdd.addEventListener("click", function () {
  console.log("User Name is ", userName.value);
  localStorage.setItem("User Name", userName.value);
  document.getElementById("highlight").innerHTML = "User Name is " + userName.value;
  document.getElementById("user").value = "";
  checkDuplicate();
});

function checkDuplicate() {
  if (userName.value === localStorage.getItem("User Name")) {
    btnAdd.innerHTML = "Modify";
  }
}

let btnDelete = document.getElementById("delete");
btnDelete.addEventListener("click", function () {
  localStorage.removeItem("User Name");
  btnAdd.innerHTML = "Add";
  document.getElementById("highlight").innerHTML = "User name is already deleted"
});
