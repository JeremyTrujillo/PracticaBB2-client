import { UsersApi } from "../../api/users.api";
import "./login.component.scss";
import { Component } from "react";

const usersApi = new UsersApi();

export default class LoginComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      credentialsError: false,
      userError: false
    };
  }

  login = () => {
    if (!this.state.username) {
      this.setState({usernameError: true})
    }
    if (!this.state.password) {
      this.setState({passwordError: true})
    }
    if (!this.state.username || !this.state.password) {
      return;
    }
    usersApi.login(this.state.username, this.state.password).then(response => {
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.roles[0].authority)
      window.location.href = "/items";
    }).catch(error => {
      if (error.response?.status === 401) {
        this.setState({credentialsError: true});
      }
      if (error.response?.status === 404) {
        this.setState({userError: true});
      }
    });
  }

  setUsernameValue = (value) => {
    this.setState({usernameError: false});
    this.setState({credentialsError: false});
    this.setState({userError: false});
    this.setState({username: value});
  }

  setPasswordValue = (value) => {
    this.setState({passwordError: false});
    this.setState({credentialsError: false});
    this.setState({userError: false});
    this.setState({password: value});
  }

  render() {
    return (
      <div className="login">
        <div className="login-wrapper wrapper">
          <div className="login-content content">
            <h2>Login</h2>
            <input
              type="text"
              required
              id="username"
              className="username"
              placeholder="Username"
              onChange={event => this.setUsernameValue(event.target.value)}/>
            {this.state.usernameError ? <span className={'error'}>Username is mandatory</span> : null}
            <input
              type="password"
              required
              id="password"
              className="password"
              placeholder="Password"
              onChange={event => this.setPasswordValue(event.target.value)}/>
            {this.state.passwordError ? <span className={'error'}>Password is mandatory</span> : null}
            {this.state.credentialsError ? <span className={'error'}>Password is not correct</span> : null}
            {this.state.userError ? <span className={'error'}>User not found</span> : null}
            <button className="form-button action-button" onClick={this.login}>Log in</button>
          </div>
        </div>
      </div>
    )
  }
}
