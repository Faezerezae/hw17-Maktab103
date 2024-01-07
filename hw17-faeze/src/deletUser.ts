import {API_DATA,api} from "./main"
import { onLoad } from "./getAllUser";

const deleteConfirmationModal = <HTMLDivElement>(
    document.getElementById("deleteConfirmationModal")
  );
  
  const confirmDeleteButton = <HTMLButtonElement>(
    document.getElementById("confirmDelete")
  );
  
  const cancelDeleteButton = <HTMLButtonElement>(
    document.getElementById("cancelDelete")
  );
  
 export function showDeleteConfirmationModal(deleteUser: number) {
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
  
  