import { Component } from "react";
import { ItemsApi } from "../../../api/items.api";
import "./item-creator.component.scss";

const itemsApi = new ItemsApi();
export default class ItemCreatorComponent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      itemCode: '',
      description: '',
      price: 0.0,
      itemCodeEmptyError: false,
      descriptionEmptyError: false,
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
    const item = {
      "itemCode": this.state.itemCode,
      "description": this.state.description,
      "price": this.state.price
    }
    itemsApi.createItem(item).then(() => {
      window.location.href = "/items";
    }).catch((error) => {
      if (error.response?.status === 400) {
        this.setState({invalidItemCodeError: true})
      }
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      if (error.response?.status === 409) {
        this.setState({existingItemCodeError: true})
      }
    })
  }

  setItemCode = (value) => {
    this.setState({itemCode: value, itemCodeEmptyError: false, existingItemCodeError: false});
  }

  setDescription = (value) => {
    this.setState({description: value, descriptionEmptyError: false, existingItemCodeError: false});
  }

  setPrice = (value) => {
    this.setState({price: value, existingItemCodeError: false});
  }

  render() {
    return(
      <div className="item-creator">
        <h2>Creator</h2>
        <div className="editor-wrapper">
          <input type="number" placeholder="Item code..." min={1} onChange={event => this.setItemCode(event.target.value)}/>
          { this.state.itemCodeEmptyError ? <span className="error">Item code is empty</span> : null }
          <input type="text" placeholder="Description..."  onChange={event => this.setDescription(event.target.value)}/>
          { this.state.descriptionEmptyError ? <span className="error">Description is empty</span> : null }
          <input type="number" step="0.01" min="0.00" defaultValue={0.01} placeholder="Price..."  onChange={event => this.setPrice(event.target.value)}/>
          <button className="action-button form-button" onClick={this.createItem}>Create</button>
          { this.state.existingItemCodeError ? <span className="error">Item code already in use</span> : null }
          { this.state.invalidItemCodeError ? <span className="error">Invalid Item code</span> : null }
        </div>
      </div>
    )
  }
}
