import { ApiUtils } from "./apiUtils";

const apiUtils = new ApiUtils();

export class UsersApi {
  usersUrl = "http://localhost:8080/users";

  async login(username, password) {
    console.log('API')
    return apiUtils.getInstance(this.usersUrl).post('/login',
      {
        'username': username,
        'password': password
      }, {headers: {}});
  }

  async findAll() {
    return apiUtils.getInstance(this.usersUrl).get('');
  }

  async createUser(user) {
    return apiUtils.getInstance(this.usersUrl).post('', user);
  }

  async deleteUser(username) {
    return apiUtils.getInstance(this.usersUrl).delete('?username=' + username);
  }
}
