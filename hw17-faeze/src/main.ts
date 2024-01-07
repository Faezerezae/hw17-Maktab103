import "./style.css";
import "flowbite";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2000",
});

const API_DATA = "/data";

const myForm = <HTMLFormElement>document.querySelector("#myForm");
const result = <HTMLDivElement>document.getElementById("result");
const nameInput = <HTMLInputElement>document.getElementById("name");
const dateInput = <HTMLInputElement>document.getElementById("date");
const descriptionInput = <HTMLTextAreaElement>(
  document.getElementById("description")
);

const button_container = document.querySelectorAll(".brands-button button");
const mostAlltask = <HTMLButtonElement>document.getElementById("all");

const allDone = <HTMLButtonElement>document.getElementById("done");

let tag: string = "All";
console.log(tag);
button_container.forEach((buttonEvent) => {
  buttonEvent.addEventListener("click", change);
});
function change(this: any) {
  button_container.forEach(
    (tag: any) =>
      (tag.classList =
        "whitespace-nowrap p-2 border-2 border-black rounded-full")
  );
  this.classList = "active";
  tag = this.innerHTML;
}

const paginationContainer = <HTMLDivElement>(
  document.getElementById("pagination-container")
);
const paginationButtons = <HTMLDivElement>(
  document.getElementById("pagination-buttons")
);
const onClickNext = <HTMLDivElement>(
  document.getElementById("on-click-next-page")
);
const onClickPrevious = <HTMLDivElement>(
  document.getElementById("on-click-previous-page")
);

const alertName = <HTMLSpanElement>document.querySelector("#alret-one");
const alertِDate = <HTMLSpanElement>document.querySelector("#alret-two");
const alertDescription = <HTMLSpanElement>(
  document.querySelector("#alret-three")
);

const corectModalElem = <HTMLDivElement>document.querySelector("#corect-modal");
const disCorectModalElem = <HTMLDivElement>(
  document.querySelector("#discorect-modal")
);

myForm.addEventListener("submit", controller);

const corectModalHandler = () => {
  corectModalElem.style.display = "block";
  setTimeout(() => {
    corectModalElem.style.display = "none";
  }, 5000);
};

const disCorectModalHandler = () => {
  disCorectModalElem.style.display = "block";
  setTimeout(() => {
    disCorectModalElem.style.display = "none";
  }, 5000);
};

function controller(e: any) {
  e.preventDefault();
  const conditionName =
    nameInput.value.includes("_") && nameInput.value.length > 4;
  const conditionDate = dateInput.value !== "";
  const conditionDescription = descriptionInput.value.length > 8;

  if (conditionName && conditionDescription && conditionDate) {
    corectModalHandler();
    alertName.style.display = "none";
    alertِDate.style.display = "none";
    alertDescription.style.display = "none";
    postORpatch();
  }

  if (!conditionName) {
    alertName.style.display = "block";
    disCorectModalHandler();
  }
  if (!conditionDate) {
    alertِDate.style.display = "block";
    disCorectModalHandler();
  }
  if (!conditionDescription) {
    alertDescription.style.display = "block";
    disCorectModalHandler();
  }
}

const submit = <HTMLButtonElement>document.getElementById("submit");
let creatingNewUser: boolean = true;
let editNum: number;

type UserType = {
  id: number;
  name: string;
  date: Date;
  description: string;
  status: boolean;
};

function postORpatch() {
  if (creatingNewUser) {
    postFetchValue();
  } else {
    patchEditFunc();
  }
}

//-------------------------------get
let totalPages: number = 0;
let pageNumber: number = 1;
let isLoading: boolean = true;
let perPage: number = 4;

async function onLoad(page: number = 1) {
  if (isLoading) {
    result.innerHTML = '<p class="text-6xl"> loading ...<p>';
    console.log(result);
  }
  try {
    const response = await api.get(
      `${API_DATA}?_page=${page}&_limit=${perPage}`
    );
    isLoading = false;
    console.log(response);
    const data = response.data;
    pageNumber = page;
    totalPages = Math.ceil(response.headers["x-total-count"] / perPage);
    if (Math.ceil(response.headers["x-total-count"]) <= perPage) {
      paginationContainer.classList.add("hidden");
    } else {
      paginationContainer.classList.remove("hidden");
      paginationContainer.classList.add("flex");
      paginationButtonsListRender(totalPages, pageNumber);
    }
    renderUser(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

//-----------------------------------------------------------pagination
function paginationButton(page: number, isActive = false) {
  if (isActive) {
    return `
  <p
     aria-current="page"
     class="curser-pointer inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600 cursor-pointer">
     ${page}
  </p>
  `;
  }
  return `
  <p
    class="curser-pointer inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 cursor-pointer hover:text-gray-700">
    ${page}
   </p>
  `;
}

function paginationButtonsListRender(totalPages: number, activePage: number) {
  let html = "";

  for (let page = 1; page <= totalPages; page++) {
    html += paginationButton(page, activePage === page);
  }

  paginationButtons.innerHTML = html;
}

paginationButtons.addEventListener("click", (ev: any) => {
  onLoad(Number(ev.target.innerText));
});

onClickPrevious.addEventListener("click", () => {
  if (pageNumber > 1) {
    pageNumber--;
    onLoad(pageNumber);
  }
});

onClickNext.addEventListener("click", () => {
  if (pageNumber < totalPages) {
    pageNumber++;
    onLoad(pageNumber);
  }
});

mostAlltask.addEventListener("click", () => {
  onLoad();
});

onLoad();
//----------------------------post
async function postFetchValue() {
  try {
    const postResponse = await api.post(API_DATA, {
      name: nameInput.value,
      date: dateInput.value,
      description: descriptionInput.value,
      status: false,
    });
    console.log("Post Response Data:", postResponse.data);
    onLoad();
    resetForm();
  } catch (error) {
    console.error("Error:", error);
  }
}

//----------------------------deligation for delete and edit
result.addEventListener("click", handleResultClick);

function handleResultClick(e: any) {
  if (e.target.classList.contains("btn-delete")) {
    const deleteUser =
      e.target.parentElement.parentElement.parentElement.dataset.set;
    showDeleteConfirmationModal(deleteUser);
  }
  if (e.target.classList.contains("btn-edit")) {
    const editUser =
      e.target.parentElement.parentElement.parentElement.dataset.set;
    editFetchValue(editUser);
    editNum = e.target.parentElement.parentElement.parentElement.dataset.set;
  }
  if (e.target.classList.contains("inputStatus")) {
    const doneUser =
      e.target.parentElement.parentElement.parentElement.dataset.set;
    patchCheckboxDone(doneUser);
  }
}

//--------------------------------edit(patch)
async function patchEditFunc() {
  try {
    const patchResponse = await api.patch(
      `${API_DATA}/${editNum}`,
      {
        name: nameInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log("Patch Success:", patchResponse);
    onLoad();
    resetForm();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function editFetchValue(id: number) {
  try {
    const response = await api.get(`${API_DATA}/${id}`);
    const editData = response.data;

    const { name, date, description } = editData;
    nameInput.value = name;
    dateInput.value = date;
    descriptionInput.value = description;
    submit.textContent = "save";
    myForm.addEventListener("submit", controller);
    creatingNewUser = false;
  } catch (error) {
    console.error("Error:", error);
  }
}

//-------------------------------------------delete

const deleteConfirmationModal = <HTMLDivElement>(
  document.getElementById("deleteConfirmationModal")
);

const confirmDeleteButton = <HTMLButtonElement>(
  document.getElementById("confirmDelete")
);

const cancelDeleteButton = <HTMLButtonElement>(
  document.getElementById("cancelDelete")
);

function showDeleteConfirmationModal(deleteUser: number) {
  deleteConfirmationModal.classList.remove("hidden");
  deleteConfirmationModal.classList.add("flex");

  confirmDeleteButton.addEventListener("click", function () {
    deleteFetchValue(deleteUser);
    hideDeleteConfirmationModal();
  });

  cancelDeleteButton.addEventListener("click", function () {
    hideDeleteConfirmationModal();
  });
}

function hideDeleteConfirmationModal() {
  deleteConfirmationModal.classList.remove("flex");
  deleteConfirmationModal.classList.add("hidden");
}

async function deleteFetchValue(id: number) {
  try {
    const response = await api.delete(`${API_DATA}/${id}`);
    const json = response.data;
    console.log(json);
    onLoad();
  } catch (error) {
    console.error("Error:", error);
  }
}

//-------------------------------------------render
function renderUser(data: Array<UserType>) {
  result.innerHTML = "";
  data.forEach((element: UserType) => {
    const { id, name, date, description, status } = element;
    result.insertAdjacentHTML(
      "beforeend",
      `
      <div
      class="mx-auto rounded-lg grid justify-between items-center w-[400px] h-[200px] p-4 shadow-lg gap-4 m-5"
      data-set="${id}"
    >
      <p class="w-full">name: ${name}</p>
      <p class="w-full">date: ${date}</p>
      <p class="w-full truncate">description: ${description}</p>
      <div class="flex gap-5 w-full justify-between">
        <div class="flex items-center gap-1">
          <label for="checkBox${id}">done: </label>
          <input type="checkbox" class="inputStatus" id="checkBox${id}" />
        </div>
        <div class="flex gap-2">
          <button
            class="btn-delete bg-red-600 rounded-lg px-2 py-3 text-sm text-white"
          >
            delete
          </button>
          <button
            class="btn-edit bg-orange-500 rounded-lg px-2 py-3 text-sm text-white"
          >
            edit
          </button>
        </div>
      </div>
    </div>
    `
    );
    const checkInput = <HTMLInputElement>(
      document.querySelector(`#checkBox${id}`)
    );
    checkInput.checked = status;
  });
}

//-------------------------------------reset form
function resetForm() {
  nameInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  submit.textContent = "submit";
  creatingNewUser = true;
}

//---------------------------------patch for checkbox done

allDone.addEventListener("click",async () => {
  const response = await api.get(`${API_DATA}?status=true`);
  const data = response.data;
  renderUser(data);
  paginationContainer.classList.add("hidden");
});

async function patchCheckboxDone(id: number) {
  try {
    const response = await api.get(`${API_DATA}/${id}`);
    const data = response.data;
    console.log(data);
    data.status = !data.status;
    const patchResponse = await api.patch(`${API_DATA}/${id}`, data, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log("Patch Success:", patchResponse);
  } catch (error) {
    console.error("Error:", error);
  }
}

