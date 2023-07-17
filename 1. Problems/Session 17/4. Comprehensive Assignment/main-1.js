// let listCatalog = [
//   {
//     catalogId: "C001",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
//   {
//     catalogId: "C002",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
//   {
//     catalogId: "C003",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
//   {
//     catalogId: "C004",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
//   {
//     catalogId: "C005",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
//   {
//     catalogId: "C006",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
//   {
//     catalogId: "C007",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
//   {
//     catalogId: "C008",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
//   {
//     catalogId: "C009",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
//   {
//     catalogId: "C010",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
//   {
//     catalogId: "C011",
//     catalogName: "catalog 1",
//     priority: "1",
//     catalogDesc: "C001",
//     catalogStatus: "Active",
//   },
// ];
// localStorage.setItem("listCatalog", JSON.stringify(listCatalog));
let currentPage = 1;
let itemPerPage = 5;
let action = "create";

function renderData(page, listCatalog) {
  // Validate page
  let pageMax = getTotalPage(listCatalog);
  if (page < 1) {
    page = 1;
  }
  if (page > pageMax) {
    page = pageMax;
  }

  //Build function for paginating
  let indexMinOnPage = (page - 1) * itemPerPage;
  let indexMaxOnPage;
  if (page * itemPerPage > listCatalog.length) {
    indexMaxOnPage = listCatalog.length;
  } else {
    indexMaxOnPage = page * itemPerPage;
  }
  // Render data to table body
  document.getElementById("table-content").innerHTML = "";
  for (let index = indexMinOnPage; index < indexMaxOnPage; index++) {
    document.getElementById("table-content").innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${listCatalog[index].catalogId}</td>
                <td>${listCatalog[index].catalogName}</td>
                <td>${listCatalog[index].priority}</td>
                <td>${listCatalog[index].catalogDesc}</td>
                <td>${listCatalog[index].catalogStatus}</td>
                <td>
                    <button onclick = "editData('${
                      listCatalog[index].catalogId
                    }')">Edit</button>
                    <button onclick = "deleteData('${
                      listCatalog[index].catalogId
                    }')">Delete</button>
                </td>
            </tr>`;
  }

  let listPages = document.getElementById("listPages");
  listPages.innerHTML = "";
  for (let i = 1; i <= pageMax; i++) {
    document.getElementById(
      "listPages"
    ).innerHTML += `<li><a href="javascript:clickPage('${i}')">${i}</a></li>`;
  }

  let back = document.getElementById("back");
  let next = document.getElementById("next");
  if (currentPage >= pageMax) {
    next.style.visibility = "hidden";
  } else {
    next.style.visibility = "visible";
  }
  if (currentPage <= 1) {
    back.style.visibility = "hidden";
  } else {
    back.style.visibility = "visible";
  }
}

function getTotalPage(listCatalog) {
  return Math.ceil(listCatalog.length / itemPerPage);
}

function clickPage(page) {
  currentPage = page;
  let listCatalog = localStorage.getItem("listCatalog")
    ? JSON.parse(localStorage.getItem("listCatalog"))
    : [];
  renderData(currentPage, listCatalog);
}

function backPage() {
  let listCatalog = localStorage.getItem("listCatalog")
    ? JSON.parse(localStorage.getItem("listCatalog"))
    : [];
  currentPage--;
  renderData(currentPage, listCatalog);
}

function nextPage() {
  let listCatalog = localStorage.getItem("listCatalog")
    ? JSON.parse(localStorage.getItem("listCatalog"))
    : [];
  currentPage++;
  renderData(currentPage, listCatalog);
}

let btnSave = document.getElementById("save");
btnSave.addEventListener("click", function (event) {
  event.preventDefault();
  if (action == "create") {
    addData();
  } else {
    updateData();
  }
  clearDataForm();
});

function addData() {
  let listCatalog = localStorage.getItem("listCatalog")
    ? JSON.parse(localStorage.getItem("listCatalog"))
    : [];
  let newCatalog = getDataForm();
  listCatalog.unshift(newCatalog);
  localStorage.setItem("listCatalog", JSON.stringify(listCatalog));
  renderData(1, listCatalog);
}
function getDataForm() {
  let catalogId = document.getElementById("catalog-Id").value;
  let catalogName = document.getElementById("catalog-name").value;
  let priority = document.getElementById("catalog-prior").value;
  let catalogDesc = document.getElementById("catalog-desc").value;
  let catalogStatus = document.querySelector(
    'input[name="catalog-status"]:checked'
  ).value;
  let catalog = {
    catalogId,
    catalogName,
    priority,
    catalogDesc,
    catalogStatus,
  };
  return catalog;
}

function updateData() {
  let listCatalog = localStorage.getItem("listCatalog")
    ? JSON.parse(localStorage.getItem("listCatalog"))
    : [];
  let updateCatalog = getDataForm();
  let indexUpdate = getIndexById(listCatalog, updateCatalog.catalogId);
  console.log(indexUpdate);
  if (indexUpdate > -1) {
    listCatalog[indexUpdate] = updateCatalog;
  }
  localStorage.setItem("listCatalog", JSON.stringify(listCatalog));
  document.getElementById("catalog-Id").readOnly = false;
  action = "create";
  renderData(1, listCatalog);
}

function getIndexById(listCatalog, catalogId) {
  for (let index = 0; index < listCatalog.length; index++) {
    if (listCatalog[index].catalogId == catalogId) {
      return index;
    }
  }
  return -1;
}

function editData(catalogId) {
  let listCatalog = localStorage.getItem("listCatalog")
    ? JSON.parse(localStorage.getItem("listCatalog"))
    : [];
  let index = getIndexById(listCatalog, catalogId);
  if (index > -1) {
    document.getElementById("catalog-Id").value = listCatalog[index].catalogId;
    document.getElementById("catalog-Id").readOnly = true;
    document.getElementById("catalog-name").value =
      listCatalog[index].catalogName;
    document.getElementById("catalog-prior").value =
      listCatalog[index].priority;
    document.getElementById("catalog-desc").value =
      listCatalog[index].catalogDesc;
    if (listCatalog[index].catalogStatus == "Active") {
      document.getElementById("active").checked = "true";
    } else {
      document.getElementById("inactive").checked = "true";
    }
  }
  action = "edit";
}

function deleteData(catalogId) {
  let listCatalog = localStorage.getItem("listCatalog")
    ? JSON.parse(localStorage.getItem("listCatalog"))
    : [];
  let indexDelete = getIndexById(listCatalog, catalogId);
  let deleteCheck = confirm("Please ensure that you wanna delete this data");
  console.log(indexDelete);
  if (indexDelete > -1) {
    if (deleteCheck) {
      listCatalog.splice(indexDelete, 1);
    }
  }
  localStorage.setItem("listCatalog", JSON.stringify(listCatalog));
  renderData(1, listCatalog);
}

let btnSearch = document.getElementById("search");
btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  searchData();
});

function searchData(page) {
  let listCatalog = localStorage.getItem("listCatalog")
    ? JSON.parse(localStorage.getItem("listCatalog"))
    : [];
  let keyWord = document.getElementById("key-word").value;
  let searchCatalogList = listCatalog.filter((catalog) =>
    catalog.catalogName.includes(keyWord)
  );
  renderData(1, searchCatalogList);
}

function sortCatalog() {
  let listCatalog = localStorage.getItem("listCatalog")
    ? JSON.parse(localStorage.getItem("listCatalog"))
    : [];
  let sortMethod = document.getElementById("sort").value;
  switch (sortMethod) {
    case "catalogName ASC":
      listCatalog.sort((a, b) =>
        a.catalogName > b.catalogName
          ? 1
          : a.catalogName < b.catalogName
          ? -1
          : 0
      );
      break;
    case "catalogName DESC":
      listCatalog.sort((a, b) =>
        a.catalogName > b.catalogName
          ? -1
          : a.catalogName < b.catalogName
          ? 1
          : 0
      );
      break;
    case "Priority ASC":
      listCatalog.sort((a, b) => a.priority - b.priority);
      break;
    case "Priority DESC":
      listCatalog.sort((a, b) => b.priority - a.priority);
      break;
  }
  localStorage.setItem("listCatalog", JSON.stringify(listCatalog));
  renderData(1, listCatalog);
}

function clearDataForm() {
  document.getElementById("catalog-Id").value = "";
  document.getElementById("catalog-name").value = "";
  document.getElementById("catalog-prior").value = "";
  document.getElementById("catalog-desc").value = "";
}

let listCatalogOnload = localStorage.getItem("listCatalog")
  ? JSON.parse(localStorage.getItem("listCatalog"))
  : [];
document.onload = renderData(1, listCatalogOnload);
