let currentPage = 1;
let classPerPage = 10;
let action = "create";
let listCourseOnLoad = localStorage.getItem("Data Management")
  ? JSON.parse(localStorage.getItem("Data Management"))
  : [];
listStudentRender = [];

function renderStudent(page, listStudent) {
  //validate page
  let pageMax = getPageMax(listStudent);
  if (page > pageMax) {
    page = pageMax;
  }
  if (page < 1) {
    page = 1;
  }

  //build function for pagination
  let itemMaxOnPage;
  let itemMinOnPage = (page - 1) * classPerPage;

  if (page * classPerPage > listStudent.length) {
    itemMaxOnPage = listStudent.length;
  } else {
    itemMaxOnPage = page * classPerPage;
  }
  //render data of course to table
  document.getElementById("student-info").innerHTML = "";

  for (let index = itemMinOnPage; index < itemMaxOnPage; index++) {
    document.getElementById("student-info").innerHTML += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${listStudent[index].studentId}</td>
        <td>${listStudent[index].fullName}</td>
        <td>${listStudent[index].yearOfBirth}</td>
        <td>${listStudent[index].address}</td>
        <td>${listStudent[index].status}</td>
        <td>
        <button class="btn btn-primary edit" data-bs-toggle="modal" data-bs-target="#newStudent" onclick="editData('${
          listStudent[index].studentId
        }')"></button>
            <button onclick = "deleteData('${
              listStudent[index].studentId
            }')" class="btn btn-primary delete"></button>
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

function getPageMax(listStudent) {
  return Math.ceil(listStudent.length / classPerPage);
}

function clickPage(page, listStudent) {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  listStudent = getListStudent(listCourse);
  currentPage = page;
  if (listStudentRender.length == 0) {
    listStudentRender = listStudent;
    renderStudent(currentPage, listStudentRender);
  } else {
    renderStudent(currentPage, listStudentRender);
  }
}

function backPage() {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let listStudent = getListStudent(listCourse);
  currentPage--;
  if (listStudentRender.length == 0) {
    listStudentRender = listStudent;
    renderStudent(currentPage, listStudentRender);
  } else {
    renderStudent(currentPage, listStudentRender);
  }
}

function nextPage() {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let listStudent = getListStudent(listCourse);
  currentPage++;
  if (listStudentRender.length == 0) {
    listStudentRender = listStudent;
    renderStudent(currentPage, listStudentRender);
  } else {
    renderStudent(currentPage, listStudentRender);
  }
}

function validateData() {
  debugger;
  let studentId = document.getElementById("studentId").value;
  let fullName = document.getElementById("fullName").value;
  let yearOfBirth = document.getElementById("yearOfBirth").value;
  let address = document.getElementById("address").value;
  let courseId = document.getElementById("course").value;
  let classID = document.getElementById("classStudent").value;
  if (studentId == "") {
    document.getElementById("studentId").style.boxShadow = "0px 0px 3px red";
    document.getElementById("studentId").placeholder =
      "Student ID should not be empty";
    return false;
  }
  if (fullName == "") {
    document.getElementById("fullName").style.boxShadow = "0px 0px 3px red";
    document.getElementById("fullName").placeholder =
      "Full Name should not be empty";
    return false;
  }
  if (yearOfBirth == "") {
    document.getElementById("yearOfBirth").style.boxShadow = "0px 0px 3px red";
    document.getElementById("yearOfBirth").placeholder =
      "Year of birth should not be empty";
    return false;
  }
  if (address == "") {
    document.getElementById("address").style.boxShadow = "0px 0px 3px red";
    document.getElementById("address").placeholder =
      "Address should not be empty";
    return false;
  }
  if (courseId == "") {
    // document.getElementById("courseId").style.boxShadow = "0px 0px 3px red";
    alert("Please choose the course for student");
    return false;
  }
  if (classID == "") {
    // document.getElementById("classStudent").style.boxShadow = "0px 0px 3px red";
    alert("Please choose the class for student");
    return false;
  }
  document.getElementById("studentId").style.boxShadow = "0px 0px 0px white";
  document.getElementById("fullName").style.boxShadow = "0px 0px 0px white";
  document.getElementById("yearOfBirth").style.boxShadow = "0px 0px 0px white";
  document.getElementById("address").style.boxShadow = "0px 0px 0px white";
  return true;
}

var newStudentModal = new bootstrap.Modal("#newStudent", {
  keyboard: false,
});
let btnSave = document.getElementById("save");
btnSave.addEventListener("click", function (event) {
  event.preventDefault();
  if (validateData()) {
    if (action == "create") {
      addNewStudent();
      clearDataForm();
      newStudentModal.hide();
    } else {
      updateData();
      clearDataForm();
      newStudentModal.hide();
    }
  }
});

function addNewStudent() {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let studentId = document.getElementById("studentId").value;
  let fullName = document.getElementById("fullName").value;
  let yearOfBirth = document.getElementById("yearOfBirth").value;
  let address = document.getElementById("address").value;
  let courseId = document.getElementById("course").value;
  let classID = document.getElementById("classStudent").value;
  let status = document.querySelector("input[type='radio']:checked").value;
  let indexCourse = getIndexById(courseId, listCourse);
  let indexClass = getIndexClassInCourseByClassId(classID, listCourse);
  if (indexCourse > -1 && indexClass > -1) {
    let addedStudent = {
      studentId,
      fullName,
      yearOfBirth,
      address,
      status,
    };
    listCourse[indexCourse].arrClass[indexClass].studentArr.push(addedStudent);
    localStorage.setItem("Data Management", JSON.stringify(listCourse));
    let listStudent = getListStudent(listCourse);
    renderStudent(1, listStudent);
  }
}

let btnOpenModal = document.getElementById("add");
btnOpenModal.addEventListener("click", function () {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let courseSelectBox = document.getElementById("course");
  courseSelectBox.innerHTML = `
  <option value="" selected></option>
`;
  listCourse.forEach((course) => {
    courseSelectBox.innerHTML += `
        <option value="${course.courseId}">${course.courseName}</option>
      `;
  });
});

function showClassOfCourse() {
  debugger;
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  // let listStudent = getListStudent(listCourse);
  courseId = document.getElementById("course").value;
  let classSelectBox = document.getElementById("classStudent");
  classSelectBox.innerHTML = "";
  for (let item of listCourse) {
    if (item.courseId == courseId) {
      for (let classItem of item.arrClass) {
        classSelectBox.innerHTML += `
        <option selected value="${classItem.classId}">${classItem.className}</option>
      `;
      }
    }
  }
}

function getIndexById(courseId, listCourse) {
  for (let index = 0; index < listCourse.length; index++) {
    if (listCourse[index].courseId == courseId) {
      return index;
    }
  }
  return -1;
}

// function getIndexCourseByClassId(classId, listCourse) {
//   for (let i = 0; i < listCourse.length; i++) {
//     for (let j = 0; j < listCourse[i].arrClass.length; j++) {
//       if (listCourse[i].arrClass[j].classId == classId) {
//         return i;
//       }
//     }
//   }
//   return -1;
// }

function getIndexClassInCourseByClassId(classId, listCourse) {
  for (let i = 0; i < listCourse.length; i++) {
    for (let j = 0; j < listCourse[i].arrClass.length; j++) {
      if (listCourse[i].arrClass[j].classId == classId) {
        return j;
      }
    }
  }
  return -1;
}

function updateData() {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let studentId = document.getElementById("studentId").value;
  let fullName = document.getElementById("fullName").value;
  let yearOfBirth = document.getElementById("yearOfBirth").value;
  let address = document.getElementById("address").value;
  let courseId = document.getElementById("course").value;
  let classId = document.getElementById("classStudent").value;
  let status = document.querySelector("input[type='radio']:checked").value;
  let indexCourse = getIndexById(courseId, listCourse);
  let indexClass = getIndexClassInCourseByClassId(classId, listCourse);
  let indexStudent = getIndexStudentInClassByStudentId(studentId, listCourse);
  if (indexCourse > -1 && indexClass > -1 && indexStudent > -1) {
    let updatedStudent = {
      studentId,
      fullName,
      yearOfBirth,
      address,
      status,
    };
    listCourse[indexCourse].arrClass[indexClass].studentArr[indexStudent] =
      updatedStudent;
    localStorage.setItem("Data Management", JSON.stringify(listCourse));
    let listStudent = getListStudent(listCourse);
    renderStudent(1, listStudent);
    action = "create";
    document.getElementById("studentId").readOnly = false;
  }
}

function editData(studentId) {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let listStudent = getListStudent(listCourse);
  let indexEdit = getIndexStudentInListStudentByStudentID(
    studentId,
    listStudent
  );
  let indexCourse = getIndexCourseByStudentId(studentId, listCourse);
  let indexClass = getIndexClassInCourseByStudentId(studentId, listCourse);
  let courseSelectBox = document.getElementById("course");
  courseSelectBox.innerHTML = "";
  listCourse.forEach((course) => {
    courseSelectBox.innerHTML += `
        <option selected value="${course.courseId}">${course.courseName}</option>
      `;
  });
  if (indexEdit > -1 && indexClass > -1 && indexCourse > -1) {
    document.getElementById("studentId").value =
      listStudent[indexEdit].studentId;
    document.getElementById("studentId").readOnly = true;
    document.getElementById("fullName").value = listStudent[indexEdit].fullName;
    document.getElementById("yearOfBirth").value =
      listStudent[indexEdit].yearOfBirth;
    document.getElementById("address").value = listStudent[indexEdit].address;
    document.getElementById("course").value = listCourse[indexCourse].courseId;
    document.getElementById("classStudent").value =
      listCourse[indexCourse].arrClass[indexClass].classId;
    if (listStudent[indexEdit].status == "Active") {
      document.getElementById("active").checked = true;
    } else {
      document.getElementById("inactive").checked = true;
    }
    action = "edit";
  }
}

function getIndexStudentInClassByStudentId(studentId, listCourse) {
  for (let i = 0; i < listCourse.length; i++) {
    for (let j = 0; j < listCourse[i].arrClass.length; j++) {
      for (let k = 0; k < listCourse[i].arrClass[j].studentArr.length; k++) {
        if (listCourse[i].arrClass[j].studentArr[k].studentId == studentId) {
          return k;
        }
      }
    }
    return -1;
  }
}

function getIndexClassInCourseByStudentId(studentId, listCourse) {
  for (let i = 0; i < listCourse.length; i++) {
    for (let j = 0; j < listCourse[i].arrClass.length; j++) {
      for (let k = 0; k < listCourse[i].arrClass[j].studentArr.length; k++) {
        if (listCourse[i].arrClass[j].studentArr[k].studentId == studentId) {
          return j;
        }
      }
    }
    return -1;
  }
}

function getIndexCourseByStudentId(studentId, listCourse) {
  for (let i = 0; i < listCourse.length; i++) {
    for (let j = 0; j < listCourse[i].arrClass.length; j++) {
      for (let k = 0; k < listCourse[i].arrClass[j].studentArr.length; k++) {
        if (listCourse[i].arrClass[j].studentArr[k].studentId == studentId) {
          return i;
        }
      }
    }
    return -1;
  }
}

function deleteData(studentId) {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let indexDeleteInCourse = getIndexCourseByStudentId(studentId, listCourse);
  let indexDeleteInClass = getIndexClassInCourseByStudentId(
    studentId,
    listCourse
  );
  let indexDeleteInStudent = getIndexStudentInClassByStudentId(
    studentId,
    listCourse
  );
  let deleteCheck = confirm(
    "Please make sure that you wanna delete this class"
  );
  if (
    indexDeleteInClass > -1 &&
    indexDeleteInCourse > -1 &&
    indexDeleteInStudent > -1
  ) {
    if (deleteCheck) {
      listCourse[indexDeleteInCourse].arrClass[
        indexDeleteInClass
      ].studentArr.splice(indexDeleteInStudent, 1);
      localStorage.setItem("Data Management", JSON.stringify(listCourse));
      let listStudent = getListStudent(listCourse);
      renderStudent(1, listStudent);
    }
  }
}

function getIndexStudentInListStudentByStudentID(studentId, listStudent) {
  for (let index = 0; index < listStudent.length; index++) {
    if (listStudent[index].studentId == studentId) {
      return index;
    }
  }
}

let btnSearch = document.getElementById("search");
btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let listStudent = getListStudent(listCourse);
  let keyword = document.getElementById("keyword").value;
  let listStudentSearch = listStudent.filter((studentItem) =>
    studentItem.fullName.includes(keyword)
  );
  localStorage.setItem("searchList", JSON.stringify(listStudentSearch));
  listStudentRender = listStudentSearch;
  renderStudent(1, listStudentRender);
});

function sortData() {
  let listCourse = localStorage.getItem("Data Management")
    ? JSON.parse(localStorage.getItem("Data Management"))
    : [];
  let listStudent = getListStudent(listCourse);
  let sortOrder = document.getElementById("sort").value;
  switch (sortOrder) {
    case "Student Name ASC":
      listStudent.sort((a, b) =>
        a.fullName > b.fullName ? 1 : a.fullName < b.fullName ? -1 : 0
      );
      break;
  }
  localStorage.setItem("Sorted Student", JSON.stringify(listStudent));
  let sortedListStudent = localStorage.getItem("Sorted Student")
    ? JSON.parse(localStorage.getItem("Sorted Student"))
    : [];
  listStudentRender = sortedListStudent;
  renderStudent(1, listStudentRender);
}

function clearDataForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("fullName").value = "";
  document.getElementById("yearOfBirth").value = "";
  document.getElementById("address").value = "";
  document.getElementById("course").value = "";
  document.getElementById("classStudent").value = "";
  document.getElementById("active").checked = true;
}

let btnLogOut = document.getElementById("logout");
btnLogOut.addEventListener("click", function () {
  localStorage.removeItem("Logged-in User");
  window.location.href = "http://127.0.0.1:5500/firstProject/html/login.html";
});

function getListStudent(listCourseOnLoad) {
  let listStudentOnLoad = [];
  for (let item of listCourseOnLoad) {
    for (let classItem of item.arrClass) {
      for (let studentItem of classItem.studentArr) {
        listStudentOnLoad.push(studentItem);
      }
    }
  }
  return listStudentOnLoad;
}
let listStudentOnLoad = getListStudent(listCourseOnLoad);
document.onload = renderStudent(1, listStudentOnLoad);
