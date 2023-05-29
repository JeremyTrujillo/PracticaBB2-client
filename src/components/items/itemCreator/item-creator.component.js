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
    const item = {
      "itemCode": this.state.itemCode,
      "description": this.state.description,
      "price": this.state.price
    }
    itemsApi.createItem(item).then((response) => {
      console.log(response);
      window.location.href = "/items";
    }).catch((error) => {
      console.log(error)
      if (error.response?.status === 400) {
        this.setState({invalidItemCodeError: true})
      }
      if (error.response?.status === 409) {
        this.setState({existingItemCodeError: true})
      }
    })
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
        <h2>Creator</h2>
        <div className="editor-wrapper">
          <input type="number" placeholder="Item code..." min={1} onChange={event => this.setItemCodeValue(event.target.value)}/>
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
