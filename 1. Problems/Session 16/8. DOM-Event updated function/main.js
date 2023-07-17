class Book {
  constructor() {
    this.bookId = "";
    this.bookName = "";
    this.price = "";
    this.author = "";
    this.status = "";
  }
  inputData() {
    this.bookId = document.getElementById("bookId").value;
    this.bookName = document.getElementById("bookName").value;
    this.price = Number(document.getElementById("price").value);
    this.author = document.getElementById("author").value;
    this.status = document.querySelector(
      "input[name = 'bookStatus']:checked"
    ).value;
  }
  displayBook() {
    document.getElementById("table-body").innerHTML += `
                <tr>
                  <td>${this.bookId}</td>
                  <td>${this.bookName}</td>
                  <td>${this.price}</td>
                  <td>${this.author}</td>
                  <td>${this.status}</td>
                  <td>
                      <button type= "submit" onclick = "editData(${this.bookId})">Edit</button>
                      <button type= "submit" onclick = "deleteData(${this.bookId})">Delete</button>
                  </td>
              </tr>`;
  }
}

function displayBookFromArr (){
  document.getElementById("table-body").innerHTML ="";
  for (let index = 0; index < arrBooks.length;index++) {
    arrBooks[index].displayBook();
  }
}
document.onload = displayBookFromArr();

let arrBooks = [];
let action = "create";

let btnSaveData = document.getElementById("save");
btnSaveData.addEventListener("click", function (event) {
  event.preventDefault();
  if (action == "create") {
    let book = new Book();
    book.inputData();
    arrBooks.push(book);
    book.displayBook();
  } else {
    document.getElementById("bookId").readOnly = false;
    action = "create";
  }
  clearDataForm();
});

function getIndexById(bookId) {
  for (let index = 0; index < arrBooks.length; index++) {
    if (bookId == arrBooks[index].bookId) {
      return index;
    }
  }
  return -1;
}

function editData(bookId) {
  let indexEdit = getIndexById(bookId);
  if (indexEdit > -1) {
    document.getElementById("bookId").value = arrBooks[indexEdit].bookId;
    document.getElementById("bookName").value = arrBooks[indexEdit].bookName;
    document.getElementById("price").value = arrBooks[indexEdit].price;
    document.getElementById("author").value = arrBooks[indexEdit].author;
    if (arrBooks[index].status == "active") {
      document.getElementById("active").checked = true;
    } else {
      document.getElementById("inActive").checked = true;
    }
    action = "edit";
    document.getElementById("bookId").readOnly = true;
  }
}

function clearDataForm() {
  document.getElementById("bookId").value = "";
  document.getElementById("bookName").value = "";
  document.getElementById("price").value = "";
  document.getElementById("author").value = "";
}

function deleteData(bookId) {
  let indexDelete = getIndexById(bookId);
  arrBooks.splice(indexDelete, 1);
  displayBookFromArr();
}

let btnSearch = document.getElementById("search");
btnSearch.addEventListener("click", function () {
  let keyWord = document.getElementById("keyWord").value;
  document.getElementById("table-body").innerHTML = "";
  for (let index = 0; index < arrBooks.length; index++) {
    if (arrBooks[index].bookName.include(keyWord)) {
      document.getElementById("table-body").innerHTML += `
                                        <tr>
                                            <td>${arrBooks[index].bookId}</td>
                                            <td>${arrBooks[index].bookName}</td>
                                            <td>${arrBooks[index].price}</td>
                                            <td>${arrBooks[index].author}</td>
                                            <td>${arrBooks[index].status}</td>
                                            <td>
                                                <button type= "submit" onclick = "editData(${arrBooks[index].bookId})">Edit</button>
                                                <button type= "submit" onclick = "deleteData(${arrBooks[index].bookId}">Delete</button>
                                            </td>
                                        </tr>`;
    }
  }
});

let btnSort = document.getElementById("sort");
btnSort.addEventListener("click", function () {
  arrBooks.sort((a, b) => a.price - b.price);
  displayBookFromArr()
});