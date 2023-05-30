import React from "react";
import './modal.scss';

function Modal({ setOpenModal, confirm, modalType }) {
  let text = '';

  switch (modalType) {
    case 'deactivateItem':
      text = "Are you sure that you want to deactivate this item?";
      break;
    case 'deleteItem':
      text = "Are you sure that you want to delete this item?";
      break;
    case 'deleteUser':
      text = "Are you sure that you want to delete this user?";
      break;
    default:
  }

  return (
    <div className="background">
      <div className="container">
        <div className="button-wrapper">
          <button onClick={() => setOpenModal(false)}>X</button>
        </div>
        <div className="text-wrapper">
          <span className="modal-text">{text}</span>
        </div>
        <div className="action-buttons-wrapper">
          <button className="action-button" onClick={() => confirm()}>Continue</button>
          <button className="action-button" onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
