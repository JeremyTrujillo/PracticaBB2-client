import { Component } from "react";

export default class ItemEditorComponent extends Component{

  
  constructor(props) {
    super(props);
    this.state = {
      itemCode: '',
      description: '',
      price: 0.0,
      itemCodeEmptyError: false,
      descriptionEmptyError: false,
      priceError: false,
      invalidItemCodeError: false,
      existingItemCodeError: false
    };
  }

  createItem = () => {
    if (!this.state.itemCode) {
      this.setState({itemCodeEmptyError: true});
    }
    if (!this.state.description) {
      this.setState({descriptionEmptyError: true});
    }
    if (!this.state.itemCode || !this.state.description) {
      return;
    }
  }

  setItemCodeValue = (value) => {
    this.setState({itemCode: value});
    this.setState({itemCodeEmptyError: false});
    this.setState({existingItemCodeError: false});
  }

  setDescriptionValue = (value) => {
    this.setState({description: value});
    this.setState({descriptionEmptyError: false});
    this.setState({existingItemCodeError: false});
  }

  setPriceValue = (value) => {
    this.setState({price: value});
    this.setState({existingItemCodeError: false});
  }

  render() {
    return(
      <div className="item-creator">
        <h2>Editor</h2>
        <div className="editor-wrapper">
          <input type="number" placeholder="Item code..." disabled={true}/>
          { this.state.itemCodeEmptyError ? <span className="error">Item code is empty</span> : null }
          <input type="text" placeholder="Description..."  onChange={event => this.setDescriptionValue(event.target.value)}/>
          { this.state.descriptionEmptyError ? <span className="error">Description is empty</span> : null }
          <input type="number" step="0.01" min="0.00" defaultValue={0.01} placeholder="Price..."  onChange={event => this.setPriceValue(event.target.value)}/>
          <button class="action-button form-button" onClick={this.createItem}>Create</button>
          { this.state.existingItemCodeError ? <span className="error">Item code already in use</span> : null }
          { this.state.invalidItemCodeError ? <span className="error">Invalid Item code</span> : null }
        </div>
      </div>
    )
  }
}
