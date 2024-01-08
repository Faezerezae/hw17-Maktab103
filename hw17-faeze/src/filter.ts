import { API_DATA, api, result } from "./main.ts";
import {
  paginationContainer,
  paginationButtonsListRender,
} from "./pagination.ts";
import { renderUser } from "./renderUser.ts";
export const allDone = <HTMLButtonElement>document.getElementById("done");
let isLoading: boolean = true;
export let perPage: number = 4;
export let totalPages: number = 0;
let pageNumber: number = 1;

export async function patchCheckboxDone(id: number) {
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

export async function filterStatusT(page: number = 1) {
  if (isLoading) {
    result.innerHTML = '<p class="text-6xl"> loading ...<p>';
    console.log(result);
  }
  try {
    const response = await api.get(
      `${API_DATA}?_page=${page}&_limit=${perPage}&status=true`
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

allDone.addEventListener("click", () => {
  pageNumber = 1;
  filterStatusT(pageNumber);
});
