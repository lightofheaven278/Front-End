let btnLogOut = document.getElementById("logout");
btnLogOut.addEventListener("click", function () {
  localStorage.removeItem("Logged-in User");
  window.location.href =
    "http://127.0.0.1:5500/firstProject/html/login.html";
});

function getNumberOfCourse() {
  let dataManagement = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let numberOfCourse = 0;
  dataManagement.forEach((course) => {
    numberOfCourse++;
  });
  document.getElementById("course-total").innerText =
    "Number of courses is: " + numberOfCourse;
}

function getNumberOfClass() {
  let dataManagement = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let numberOfClass = 0;
  let numberOfWaitingClass = 0;
  let numberOfInProgressClass = 0;
  dataManagement.forEach((course) => {
    course.arrClass.forEach((classOfCourse) => {
      numberOfClass++;
      if (classOfCourse.status == "Waiting") {
        numberOfWaitingClass++;
      }
      if (classOfCourse.status == "In-progress") {
        numberOfInProgressClass++;
      }
    });
  });
  document.getElementById("class-total").innerText =
    "Number of classes is: " + numberOfClass;
  document.getElementById("waiting-class").innerText =
    "Number of waiting classes is: " + numberOfWaitingClass;
  document.getElementById("in-progress-class").innerText =
    "Number of in-progress classes is: " + numberOfInProgressClass;
}

function getNumberOfStudent() {
  let dataManagement = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let numberOfStudent = 0;
  let numberOfActiveStudent = 0;
  let numberOfInActiveStudent = 0;
  dataManagement.forEach((course) => {
    course.arrClass.forEach((classOfCourse) => {
      classOfCourse.studentArr.forEach((student) => {
        numberOfStudent++;
        if (student.status == "Active") {
          numberOfActiveStudent++;
        }
        if (student.status == "Inactive") {
          numberOfInActiveStudent++;
        }
      });
    });
  });
  document.getElementById("student-total").innerText =
    "Number of students is: " + numberOfStudent;
  document.getElementById("active-student").innerText =
    "Number of active students is: " + numberOfActiveStudent;
  document.getElementById("inactive-student").innerText =
    "Number of inactive students is: " + numberOfInActiveStudent;
}

function checkLogin() {
  let email = localStorage.getItem("Logged-in User");
  if (email == null) {
    window.location.href =
      "http://127.0.0.1:5500/firstProject/html/login.html";
  }
  getNumberOfCourse();
  getNumberOfClass();
  getNumberOfStudent();
}

window.onload = checkLogin();
