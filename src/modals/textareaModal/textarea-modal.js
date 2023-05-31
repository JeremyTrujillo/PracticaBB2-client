import React, { Component } from "react";
import './textarea-modal.scss';

export default class TextareaModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            reason: '',
            reasonEmptyError: false
        }
        switch (this.props.modalType) {
            case 'deactivateItem':
                this.state.text = "Are you sure that you want to deactivate this item?";
              break;
            default:
          }
    }

    checkReason = () => {
        if (!this.state.reason) {
            this.setState({reasonEmptyError: true});
            return;
        }
        this.props.confirm(this.state.reason);
    } 
 
    render() {
        return(
            <div className="textarea-modal">
              <div className="container">
                <div className="button-wrapper">
                  <button onClick={() => this.props.setOpenModal(false)}>X</button>
                </div>
                <div className="text-wrapper">
                  <span className="modal-text">{this.state.text}</span>
                </div>
                <div className="textarea-wrapper">
                    <textarea placeholder="Reason..." onChange={event => {this.setState({reason: event.target.value, reasonEmptyError: false})}}></textarea>
                    { this.state.reasonEmptyError ? <span className="error">Reason is mandatory</span> : null }
                </div>
                <div className="action-buttons-wrapper">
                  <button className="action-button" onClick={this.checkReason}>Continue</button>
                  <button className="action-button" onClick={() => this.props.setOpenModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )
    }
}