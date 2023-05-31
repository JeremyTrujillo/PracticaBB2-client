import React, { Component } from "react";
import './user-viewer.component.scss';
import DialogModal from "../../../modals/dialogModal/dialog-modal";
import { UsersApi } from "../../../api/users.api";

const usersApi = new UsersApi();

export default class UserViewerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      modalOpen: false,
      modalType: ''
    }
  }

  role = localStorage.getItem("role");

  setModal = (boolean) => {
    this.setState({modalOpen: boolean, modalType: ''});
  }

  modalAction = () => {
    if (this.state.modalType === 'deleteUser') {
      this.deleteUser();
    }
  }

  deleteUser = () => {
    usersApi.deleteUser(this.state.user.username).then(() => {
      window.location.href = "/users";
    }).catch((error) => {
      console.log(error)
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      if (error.response?.status === 403) {
        console.log('You are not an administrator');
      }
      if (error.response?.status === 404) {
        console.log('User not found')
      }
    })
  }

  render() {
    return(
      <div className="user-viewer">
        <div className="button-wrapper">
          {this.role === "ADMIN" ?
            <button className="action-button" onClick={() => this.setState({modalOpen: true, modalType: 'deleteUser'})}>Delete</button> : null}
        </div>
        <div className="user-header">
          <h2>{this.state.user.username}</h2>
          <span className="role">{this.state.user.role}</span>
        </div>
        {this.state.modalOpen && <DialogModal modalType={this.state.modalType} setOpenModal={this.setModal} confirm={this.modalAction} />}
      </div>
    )
  }
}
