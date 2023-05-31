import React, { Component } from "react";
import './dialog-modal.scss';

export default class DialogModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
    switch (this.props.modalType) {
      case 'deleteItem':
        this.state.text = "Are you sure that you want to delete this item?";
        break;
      case 'deleteUser':
        this.state.text = "Are you sure that you want to delete this user?";
        break;
      case 'deleteSupplier':
        this.state.text = "Are you sure that you want to delete this supplier?";
      case 'deletePriceReduction':
        this.state.text = "Are you sure that you want to delete this price reduction?";
      default:
      }
  }

  render() {
    return (
      <div className="dialog-modal">
        <div className="container">
          <div className="button-wrapper">
            <button onClick={() => this.props.setOpenModal(false)}>X</button>
          </div>
          <div className="text-wrapper">
            <span className="modal-text">{this.state.text}</span>
          </div>
          <div className="action-buttons-wrapper">
            <button className="action-button" onClick={() => this.props.confirm()}>Continue</button>
            <button className="action-button" onClick={() => this.props.setOpenModal(false)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}
