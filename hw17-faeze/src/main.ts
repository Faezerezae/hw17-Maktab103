import "./style.css";
import "flowbite";
import axios from "axios";
import { patchCheckboxDone } from "./filter";
import { editFetchValue } from "./editUser";
import { showDeleteConfirmationModal } from "./deleteUser";
import { controller } from "./validation";
import { onLoad } from "./getAllUser";

export const api = axios.create({
  baseURL: "http://localhost:2000",
});

export const API_DATA = "/data";

export const myForm = <HTMLFormElement>document.querySelector("#myForm");
export const result = <HTMLDivElement>document.getElementById("result");
export const nameInput = <HTMLInputElement>document.getElementById("name");
export const dateInput = <HTMLInputElement>document.getElementById("date");
export const descriptionInput = <HTMLTextAreaElement>(
  document.getElementById("description")
);

const button_container = document.querySelectorAll(".brands-button button");

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

myForm.addEventListener("submit", controller);
export const submit = <HTMLButtonElement>document.getElementById("submit");

//----------------------------deligation for delete and edit
result.addEventListener("click", handleResultClick);
export let editNum: number;
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

onLoad();

//-------------------------------------reset form

export function resetForm() {
  nameInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  submit.textContent = "submit";
}