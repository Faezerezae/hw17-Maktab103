import {
  resetForm,
  nameInput,
  dateInput,
  descriptionInput,
  API_DATA,
  api,
  editNum,
  myForm,
  submit,
} from "./main";
import { onLoad } from "./getAllUser";
import { controller } from "./validation";
import { postFetchValue } from "./createUser";

export let creatingNewUser: boolean = true;
export function postORpatch() {
  if (creatingNewUser) {
    postFetchValue();
  } else {
    patchEditFunc();
  }
}

export async function patchEditFunc() {
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

export async function editFetchValue(id: number) {
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
