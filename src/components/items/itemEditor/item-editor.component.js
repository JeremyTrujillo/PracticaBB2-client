import { Component } from "react";
import { ItemsApi } from "../../../api/items.api";

const itemsApi = new ItemsApi();
export default class ItemEditorComponent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      itemCode: 0,
      description: '',
      price: 0.0,
      suppliers: [],
      priceReductions: [],
      itemCodeEmptyError: false,
      descriptionEmptyError: false
    };
  }

  editItem = () => {
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
      id: this.state.id,
      itemCode: this.state.itemCode,
      description: this.state.description,
      price: this.state.price,
      suppliers: this.state.suppliers,
      priceReductions: this.state.priceReductions
    }
    itemsApi.editItem(item, this.state.id).then(()=> {
      window.location.href = "/items";
    }).catch((error) => {
      if (error.response?.status === 400) {
        console.log('Bad request')
      }
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      if (error.response?.status === 404) {
        console.log('Item or user not found')
      }
    })
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
          <div className="suppliers"></div>
          <div className="priceReductions"></div>
          <button className="action-button form-button" onClick={this.editItem}>Accept</button>
        </div>
      </div>
    )
  }
}
