import { API_DATA, api } from "./main.ts";
import { paginationContainer } from "./pagination.ts";
import { renderUser } from "./renderUser.ts";
const allDone = <HTMLButtonElement>document.getElementById("done");

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

export async function filterStatusT() {
  const response = await api.get(`${API_DATA}?status=true`);
  console.log(response);
  const data = response.data;
  renderUser(data);
  paginationContainer.classList.add("hidden");
}

allDone.addEventListener("click", () => {
  filterStatusT();
});
