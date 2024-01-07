import {resetForm,nameInput, dateInput, descriptionInput ,API_DATA,api} from "./main"
import { onLoad } from "./getAllUser";


export async function postFetchValue() {
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