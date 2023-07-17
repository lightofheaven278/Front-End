let currentPage = 1;
let coursePerPage = 3;
let action = "create";

function renderCourse(page, listCourse) {
  //validate page
  let pageMax = getPageMax(listCourse);
  if (page > pageMax) {
    page = pageMax;
  }
  if (page < 1) {
    page = 1;
  }

  //build function for pagination
  let itemMaxOnPage;
  let itemMinOnPage = (page - 1) * coursePerPage;

  if (page * coursePerPage > listCourse.length) {
    itemMaxOnPage = listCourse.length;
  } else {
    itemMaxOnPage = page * coursePerPage;
  }
  //render data of course to table
  document.getElementById("course-info").innerHTML = "";
  for (let index = itemMinOnPage; index < itemMaxOnPage; index++) {
    document.getElementById("course-info").innerHTML += `
                <tr>
                    <td scope="row">${index + 1}</td>
                    <td>${listCourse[index].courseId}</td>
                    <td>${listCourse[index].courseName}</td>
                    <td>${listCourse[index].courseDuration}</td>
                    <td>${listCourse[index].status}</td>
                    <td>
                        <button type="submit" class="btn btn-primary edit" data-bs-toggle="modal"
                        data-bs-target="#newCourse" onclick = "editData('${
                          listCourse[index].courseId
                        }')"></button>
                        <button type="submit" class="btn btn-primary delete" onclick = "deleteData('${
                          listCourse[index].courseId
                        }')"></button>
                    </td>
                </tr>`;
  }

  // Set up list pages
  document.getElementById("listPage").innerHTML = "";
  for (let i = 1; i <= pageMax; i++) {
    document.getElementById(
      "listPage"
    ).innerHTML += `<li><button id = "'${i}'" type = "submit" onclick = "clickPage('${i}')">${i}</button></li>`;
  }
  let prev = document.getElementById("prev");
  let next = document.getElementById("next");
  if (currentPage <= 1) {
    prev.style.visibility = "hidden";
  } else {
    prev.style.visibility = "visible";
  }

  if (currentPage >= pageMax) {
    next.style.visibility = "hidden";
  } else {
    next.style.visibility = "visible";
  }
}

function getPageMax(listCourse) {
  return Math.ceil(listCourse.length / coursePerPage);
}
function clickPage(page) {
  currentPage = page;
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  renderCourse(currentPage, listCourse);
}

function backPage() {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  currentPage--;
  renderCourse(currentPage, listCourse);
}

function nextPage() {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  currentPage++;
  renderCourse(currentPage, listCourse);
}

var newCourseModal = new bootstrap.Modal(document.getElementById("newCourse"), {
  keyboard: false,
});

function validateData() {
  let courseId = document.getElementById("courseId").value;
  let courseName = document.getElementById("courseName").value;
  let courseDuration = document.getElementById("courseDuration").value;
  if (courseId == "") {
    document.getElementById("courseId").style.boxShadow = "0px 0px 3px red";
    document.getElementById("courseId").placeholder =
      "Course ID should not be empty";
    return false;
  }
  if (courseName == "") {
    document.getElementById("courseName").style.boxShadow = "0px 0px 3px red";
    document.getElementById("courseName").placeholder =
      "Course Name should not be empty";
    return false;
  }
  if (courseDuration == "") {
    document.getElementById("courseDuration").style.boxShadow =
      "0px 0px 3px red";
    document.getElementById("courseDuration").placeholder =
      "Course Duration should not be empty";
    return false;
  }
  document.getElementById("courseId").style.boxShadow = "0px 0px 0px white";
  document.getElementById("courseName").style.boxShadow = "0px 0px 0px white";
  document.getElementById("courseDuration").style.boxShadow =
    "0px 0px 0px white";
  return true;
}

let btnSave = document.getElementById("save");
btnSave.addEventListener("click", function (event) {
  debugger;
  event.preventDefault();
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let courseId = document.getElementById("courseId").value;
  let courseName = document.getElementById("courseName").value;
  let courseDuration = document.getElementById("courseDuration").value;
  let status = document.querySelector("input[type='radio']:checked").value;
  if (validateData()) {
    if (action == "create") {
      let addedCourse = {
        courseId,
        courseName,
        courseDuration,
        status,
        arrClass: [],
      };
      listCourse.unshift(addedCourse);
      localStorage.setItem("Data Management", JSON.stringify(listCourse));
      clearDataForm();
      newCourseModal.hide();
      renderCourse(1, listCourse);
    } else {
      let indexUpdate = getIndexById(listCourse, courseId);
      let arrClass = listCourse[indexUpdate].arrClass;
      let updatedCourse = {
        courseId,
        courseName,
        courseDuration,
        status,
        arrClass,
      };
      listCourse[indexUpdate] = updatedCourse;
      localStorage.setItem("Data Management", JSON.stringify(listCourse));
      clearDataForm();
      newCourseModal.hide();
      renderCourse(1, listCourse);
      action = "create";
      document.getElementById("courseId").readOnly = false;
    }
  }
});

function getIndexById(listCourse, courseId) {
  for (let index = 0; index < listCourse.length; index++) {
    if (listCourse[index].courseId == courseId) {
      return index;
    }
  }
  return -1;
}

function editData(courseId) {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let indexEdit = getIndexById(listCourse, courseId);
  if (indexEdit > -1) {
    document.getElementById("courseId").value = listCourse[indexEdit].courseId;
    document.getElementById("courseName").value =
      listCourse[indexEdit].courseName;
    document.getElementById("courseDuration").value =
      listCourse[indexEdit].courseDuration;
    if (listCourse[indexEdit].status == "Active") {
      document.getElementById("active").checked = true;
    } else {
      document.getElementById("inactive").checked = true;
    }
    document.getElementById("courseId").readOnly = true;
    action = "edit";
  }
}

function deleteData(courseId) {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let indexDelete = getIndexById(listCourse, courseId);
  let checkDelete = confirm(
    "Please make sure that you wanna delete this course"
  );
  if (indexDelete > -1) {
    if (checkDelete) {
      listCourse.splice(indexDelete, 1);
    }
  }
  localStorage.setItem("Data Management", JSON.stringify(listCourse));
  renderCourse(1, listCourse);
}

let btnSearch = document.getElementById("search");
btnSearch.addEventListener("click", function () {
  let keyword = document.getElementById("keyword").value;
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let searchCourseList = listCourse.filter((course) =>
    course.courseName.includes(keyword)
  );
  renderCourse(1, searchCourseList);
});

function sortData() {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let sortOrder = document.getElementById("sort").value;
  console.log(sortOrder);
  switch (sortOrder) {
    case "Course Name ASC":
      listCourse.sort((a, b) =>
        a.courseName > b.courseName ? 1 : a.courseName < b.courseName ? -1 : 0
      );
      break;
    case "Course Duration ASC":
      listCourse.sort((a, b) => a.courseDuration - b.courseDuration);
      break;
  }
  localStorage.setItem("Data Management", JSON.stringify(listCourse));
  renderCourse(1, listCourse);
}

function clearDataForm() {
  document.getElementById("courseId").value = "";
  document.getElementById("courseName").value = "";
  document.getElementById("courseDuration").value = "";
  document.getElementById("active").checked = true;
}

let btnLogOut = document.getElementById("logout");
btnLogOut.addEventListener("click", function () {
  localStorage.removeItem("Logged-in User");
  window.location.href = "http://127.0.0.1:5500/firstProject/html/login.html";
});

let listCourseOnLoad = localStorage.getItem("Data Management")
  ? JSON.parse(localStorage.getItem("Data Management"))
  : [];
document.onload = renderCourse(1, listCourseOnLoad);
