import axios from "axios";

export class UsersApi {

  getUsersInstance() {
    return axios.create({
      baseURL: 'http://localhost:8080/users',
      timeout: 1000,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
  }

  async login(username, password) {
    return this.getUsersInstance().post('/login',
      {
        'username': username,
        'password': password
      }, {headers: {}});
  }

  async findAll() {
    return this.getUsersInstance().get('');
  }

  async createUser(user) {
    return this.getUsersInstance().post('', user);
  }

  async deleteUser(username) {
    return this.getUsersInstance().delete('?username=' + username);
  }
}
