import { nameInput, dateInput, descriptionInput } from "./main";
import { postORpatch } from "./editUser";

const alertName = <HTMLSpanElement>document.querySelector("#alret-one");
const alertِDate = <HTMLSpanElement>document.querySelector("#alret-two");
const alertDescription = <HTMLSpanElement>(
  document.querySelector("#alret-three")
);

const corectModalElem = <HTMLDivElement>document.querySelector("#corect-modal");
const disCorectModalElem = <HTMLDivElement>(
  document.querySelector("#discorect-modal")
);

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

export function controller(e: any) {
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
