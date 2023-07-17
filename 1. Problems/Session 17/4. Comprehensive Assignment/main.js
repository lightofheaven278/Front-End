// let catalogList = [
//     {"catalogId":"C001","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
//     {"catalogId":"C002","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
//     {"catalogId":"C003","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
//     {"catalogId":"C004","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
//     {"catalogId":"C005","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
//     {"catalogId":"C006","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
//     {"catalogId":"C007","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
//     {"catalogId":"C008","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
//     {"catalogId":"C009","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
//     {"catalogId":"C010","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
//     {"catalogId":"C011","catalogName":"catalog 1","priority":"1","catalogDesc":"C001","catalogStatus":"Active" },
// ];
// localStorage.setItem("catalogList", JSON.stringify(catalogList));
let action = "create";
let currentPage = 1;
let dataPerPage = 5;

function renderData(page, catalogList) {
  // get data from local storage
  // Validate page
  let pageMax = getTotalPage(catalogList);
  if (page < 1) {
    page = 1;
  }
  if (page > pageMax) {
    page = pageMax;
  }

  let content = document.getElementById("table-content");
  content.innerHTML = "";
  // Build function
  let indexMinOnPage = (page - 1) * dataPerPage;
  let indexMaxOnPage;
  if (page * dataPerPage > catalogList.length) {
    indexMaxOnPage = catalogList.length;
  } else {
    indexMaxOnPage = page * dataPerPage;
  }
  for (let i = indexMinOnPage; i < indexMaxOnPage; i++) {
    document.getElementById("table-content").innerHTML += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${catalogList[i].catalogId}</td>
                            <td>${catalogList[i].catalogName}</td>
                            <td>${catalogList[i].priority}</td>
                            <td>${catalogList[i].catalogDesc}</td>
                            <td>${catalogList[i].catalogStatus}</td>
                            <td>
                                <button id="edit" onclick="editData('${
                                  catalogList[i].catalogId
                                }')">Edit</button>
                                <button id="delete" onclick="deleteData('${
                                  catalogList[i].catalogId
                                }')">Delete</button>
                            </td>
                        </tr>`;
  }
  let listPages = document.getElementById("listPages");
  listPages.innerHTML = "";
  for (let i = 1; i <= pageMax; i++) {
    listPages.innerHTML += `<li><a href="javascript:clickPage('${i}')">${i}</a></li>`;
  }
  let back = document.getElementById("back");
  let next = document.getElementById("next");
  if (currentPage == 1) {
    back.style.visibility = "hidden";
  } else {
    back.style.visibility = "visible";
  }
  if (currentPage == pageMax) {
    next.style.visibility = "hidden";
  } else {
    next.style.visibility = "visible";
  }
}

function getTotalPage(catalogList) {
  return Math.ceil(catalogList.length / dataPerPage);
}

function clickPage(page) {
  currentPage = page;
  let catalogList = localStorage.getItem("catalogList")
    ? JSON.parse(localStorage.getItem("catalogList"))
    : [];
  renderData(page, catalogList);
}

function backPage() {
  currentPage--;
  let catalogList = localStorage.getItem("catalogList")
    ? JSON.parse(localStorage.getItem("catalogList"))
    : [];
  renderData(currentPage, catalogList);
}

function nextPage() {
  currentPage++;
  let catalogList = localStorage.getItem("catalogList")
    ? JSON.parse(localStorage.getItem("catalogList"))
    : [];
  renderData(currentPage, catalogList);
}

let btnSave = document.getElementById("save");
btnSave.addEventListener("click", function (event) {
  event.preventDefault();
  if (action == "create") {
    createCatalog();
  } else {
    updateCatalog();
  }
  clearDataForm();
});

function clearDataForm() {
  document.getElementById("catalog-Id").value = "";
  document.getElementById("catalog-name").value = "";
  document.getElementById("catalog-prior").value = "";
  document.getElementById("catalog-desc").value = "";
}

function createCatalog() {
  let catalogList = localStorage.getItem("catalogList")
    ? JSON.parse(localStorage.getItem("catalogList"))
    : [];
  let newCatalog = getDataForm();
  catalogList.unshift(newCatalog);
  localStorage.setItem("catalogList", JSON.stringify(catalogList));
  renderData(1, catalogList);
  clearDataForm();
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

function getCatalogByID(catalogList, catalogId) {
  for (let index = 0; index < catalogList.length; index++) {
    if (catalogList[index].catalogId == catalogId) {
      return index;
    }
  }
  return -1;
}

function updateCatalog() {
  let catalogList = localStorage.getItem("catalogList")
    ? JSON.parse(localStorage.getItem("catalogList"))
    : [];
  let updateCatalog = getDataForm();
  let index = getCatalogByID(catalogList, updateCatalog.catalogId);
  if (index > -1) {
    catalogList[index] = updateCatalog;
  }
  localStorage.setItem("catalogList", JSON.stringify(catalogList));
  renderData(1, catalogList);
  document.getElementById("catalog-Id").readOnly = false;
  action = "create";
}

function editData(catalogId) {
  let catalogList = localStorage.getItem("catalogList")
    ? JSON.parse(localStorage.getItem("catalogList"))
    : [];
  let indexUpdate = getCatalogByID(catalogList, catalogId);
  if (indexUpdate > -1) {
    document.getElementById("catalog-Id").value =
      catalogList[indexUpdate].catalogId;
    document.getElementById("catalog-name").value =
      catalogList[indexUpdate].catalogName;
    document.getElementById("catalog-prior").value =
      catalogList[indexUpdate].priority;
    document.getElementById("catalog-desc").value =
      catalogList[indexUpdate].catalogDesc;
    if (catalogList[indexUpdate].catalogStatus == "Active") {
      document.getElementById("active").checked = true;
    } else {
      document.getElementById("inactive").checked = true;
    }
    action = "edit";
    document.getElementById("catalog-Id").readOnly = true;
  }
}

function deleteData(catalogId) {
  let catalogList = localStorage.getItem("catalogList")
    ? JSON.parse(localStorage.getItem("catalogList"))
    : [];
  let indexDelete = getCatalogByID(catalogList, catalogId);
  let checkDelete = confirm("Please make sure that you wanna delete this data");
  if (indexDelete > -1) {
    if (checkDelete) {
      catalogList.splice(indexDelete, 1);
    }
  }
  localStorage.setItem("catalogList", JSON.stringify(catalogList));
  renderData(1, catalogList);
}

let btnSearch = document.getElementById("search");
btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  let catalogList = localStorage.getItem("catalogList")
    ? JSON.parse(localStorage.getItem("catalogList"))
    : [];
  let keyWord = document.getElementById("key-word").value;
  let catalogSearch = catalogList.filter((catalog) =>
    catalog.catalogName.includes(keyWord)
  );
  renderData(1, catalogSearch);
});

function sortCatalog() {
  let sortType = document.getElementById("sort").value;
  let catalogList = localStorage.getItem("catalogList")
    ? JSON.parse(localStorage.getItem("catalogList"))
    : [];
  switch (sortType) {
    case "catalogName ASC":
      catalogList.sort((a, b) =>
        a.catalogName > b.catalogName
          ? 1
          : a.catalogName < b.catalogName
          ? -1
          : 0
      );
      break;
    case "catalogName DESC":
      catalogList.sort((a, b) =>
        a.catalogName > b.catalogName
          ? -1
          : a.catalogName < b.catalogName
          ? 1
          : 0
      );
      break;
    case "Priority ASC":
      catalogList.sort((a, b) => a.priority - b.priority);
      break;
    case "Priority DESC":
      catalogList.sort((a, b) => b.priority - a.priority);
      break;
  }
  localStorage.setItem("catalogList", JSON.stringify(catalogList));
  renderData(1, catalogList);
}

let listCatalogOnload = localStorage.getItem("catalogList")
  ? JSON.parse(localStorage.getItem("catalogList"))
  : [];
document.onload = renderData(1, listCatalogOnload);
