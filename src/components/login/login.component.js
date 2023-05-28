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
      loginError: false
    };
  }

  login = () => {
    if (!this.state.username) {
      this.setState({usernameError: true})
    }
    if (!this.state.password) {
      this.setState({passwordError: true})
    }
    if (this.state.usernameError || this.state.passwordError) {
      return;
    }
    usersApi.login(this.state.username, this.state.password).then(response => {
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
    }).catch(error => {
      console.log(error.response.status)
      if (error.response.status === 404) {
        this.setState({loginError: true});
      }
    });
  }

  setUsernameValue = (value) => {
    this.setState({usernameError: false});
    this.setState({loginError: false});
    this.setState({username: value});
  }

  setPasswordValue = (value) => {
    this.setState({passwordError: false});
    this.setState({loginError: false});
    this.setState({password: value});
  }

  render() {
    return (
      <div className="login">
        <div className="login-wrapper">
          <div className="login-content">
            <h2>Iniciar sesión</h2>
            <input
              type="text"
              required
              id="username"
              className="username"
              placeholder="Nombre de usuario"
              onChange={event => this.setUsernameValue(event.target.value)}/>
            {this.state.usernameError ? <span className={'error'}>Debe introducir un nombre de usuario</span> : null}
            <input
              type="password"
              required
              id="password"
              className="password"
              placeholder="Contraseña"
              onChange={event => this.setPasswordValue(event.target.value)}/>
            {this.state.passwordError ? <span className={'error'}>Debe introducir una contraseña</span> : null}
            {this.state.loginError ? <span className={'error'}>El usuario introducido no existe.</span> : null}
            <button className="login-button" onClick={this.login}>Iniciar sesión</button>
          </div>
        </div>
      </div>
    )
  }
}
