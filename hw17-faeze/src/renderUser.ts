import { result } from "./main";
type UserType = {
  id: number;
  name: string;
  date: Date;
  description: string;
  status: boolean;
};
export function renderUser(data: Array<UserType>) {
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
