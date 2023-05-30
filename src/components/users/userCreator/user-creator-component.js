import { UsersApi } from "../../../api/users.api";
import { Component } from "react";
import './user-creator-component.scss';

const usersApi = new UsersApi();
export default class UserCreatorComponent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: 'USER',
      usernameEmptyError: false,
      passwordEmptyError: false,
      existingUsernameError: false
    };
  }

  createUser = () => {
    if (!this.state.username) {
      this.setState({usernameEmptyError: true});
    }
    if (!this.state.password) {
      this.setState({passwordEmptyError: true});
    }
    if (!this.state.username || !this.state.password) {
      return;
    }
    const user = {
      "username": this.state.username,
      "password": this.state.password,
      "role": this.state.role
    }
    usersApi.createUser(user).then(() => {
      window.location.href = "/users";
    }).catch((error) => {
      console.log(error)
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      if (error.response?.status === 409) {
        this.setState({existingUsernameError: true})
      }
    })
  }

  setUsername = (value) => {
    this.setState({username: value});
    this.setState({usernameEmptyError: false});
    this.setState({existingUsernameError: false});
  }

  setPassword = (value) => {
    this.setState({password: value});
    this.setState({passwordEmptyError: false});
    this.setState({existingUsernameError: false});
  }

  setRole = (value) => {
    this.setState({role: value});
    this.setState({existingUsernameError: false});
  }

  render() {
    return(
      <div className="user-creator">
        <h2>Creator</h2>
        <div className="editor-wrapper">
          <input type="text" placeholder="Username..." onChange={event => this.setUsername(event.target.value)}/>
          { this.state.usernameEmptyError ? <span className="error">Username is empty</span> : null }
          <input type="password" placeholder="Password..."  onChange={event => this.setPassword(event.target.value)}/>
          { this.state.passwordEmptyError ? <span className="error">Password is empty</span> : null }
          <select className="role" onChange={event => this.setRole(event.target.value)} defaultValue={0}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="action-button form-button" onClick={this.createUser}>Create</button>
          { this.state.existingUsernameError ? <span className="error">Username already in use</span> : null }
        </div>
      </div>
    )
  }
}
