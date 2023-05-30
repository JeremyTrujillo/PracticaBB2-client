import "./users.component.scss";
import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { UsersApi } from "../../api/users.api";
import UserViewerComponent from "./userViewer/user-viewer.component";

const usersApi = new UsersApi();
export default class UsersComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.findAll();
  }

  findAll = () => {
    usersApi.findAll().then((response) => {
      this.setState({users: response.data});
    }).catch((error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      if ( error.response?.status === 403) {
        console.log('You are not an administrator');
      }
    });
  }

  changeURL = (url) => {
    window.location.href = url;
  }

  render() {
    return (
      <div className={"users"}>
        <div className="users-wrapper wrapper">
          <h2>Users</h2>
          <div className="function-wrapper content">
            <div className={"button-wrapper "+ (window.location.pathname !== "/users" ? "cancel" : '') }>
              { window.location.pathname === "/users" ?
                <button className="button-icon" ><i title="Create user" onClick={this.changeURL.bind(this, "/users/new")}>+</i></button>
                :
                <button className="button-icon"><i title="Cancel" onClick={this.changeURL.bind(this, "/users")}>+</i></button> }
            </div>
            <Outlet />
            { window.location.pathname === "/users" ?
              <div className="list-wrapper">
                <ul className="users-list">
                  {
                    this.state.users.map(user => <li key={user.id}><UserViewerComponent user={user}/></li>)
                  }
                </ul>
              </div>
            : null }
          </div>
        </div>
      </div>
    )
  }
}
