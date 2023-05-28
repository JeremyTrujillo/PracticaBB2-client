import axios from "axios";

export class ApiUtils {

  getInstance(baseUrl) {
    return axios.create({
      baseURL: baseUrl,
      timeout: 1000,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
  }

  getItemsUrl() {
    return `http://localhost:8080/items`;
  }
}
