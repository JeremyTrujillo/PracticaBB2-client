import { Component } from "react";
import { ItemsApi } from "../../../api/items.api";
import "./item-editor.component.scss";
import ItemSuppliersEditor from "./itemSuppliersEditor/item-suppliers-editor.component";
import ItemPriceReductionsEditor from "./itemPriceReductionsEditor/item-price-reductions-editor.component";

const itemsApi = new ItemsApi();
export default class ItemEditorComponent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      item: {},
      itemCodeEmptyError: false,
      descriptionEmptyError: false,
      newSupplier: false,
      newPriceReduction: false
    };
    this.findByItemCode(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1));
  }

  findByItemCode = (itemCode) => {
    itemsApi.findByCode(itemCode).then((response) => {
      const item = response.data;
      this.setState({item: item});
    }).catch((error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      if (error.response?.status === 404) {
        window.location.href = "/items";
      }
    })
  }

  editItem = () => {
    if (!this.state.item.itemCode) {
      this.setState({itemCodeEmptyError: true});
    }
    if (!this.state.item.description) {
      this.setState({descriptionEmptyError: true});
    }
    if (!this.state.item.itemCode || !this.state.item.description) {
      return;
    }
    itemsApi.editItem(this.state.item, this.state.item.id).then(()=> {
      window.location.href = "/items";
    }).catch((error) => {
      if (error.response?.status === 400) {
        console.log('Bad request')
      }
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      if (error.response?.status === 404) {
        console.log('Item not found')
      }
    })
  }

  setDescriptionValue = (value) => {
    this.state.item.description = value;
    this.setState({descriptionEmptyError: false});
    this.setState({existingItemCodeError: false});
  }

  setPriceValue = (value) => {
    this.state.item.price = value;
    this.setState({existingItemCodeError: false});
  }

  render() {
    return(
      <div className="item-editor">
        <h2>Editor</h2>
        <div className="editor-wrapper">
          <input type="number" placeholder="Item code..." disabled={true} defaultValue={this.state.item.itemCode}/>
          { this.state.itemCodeEmptyError ? <span className="error">Item code is empty</span> : null }
          <input type="text" placeholder="Description..." defaultValue={this.state.item.description} onChange={event => this.setDescriptionValue(event.target.value)}/>
          { this.state.descriptionEmptyError ? <span className="error">Description is empty</span> : null }
          <input type="number" step="0.01" min="0.00" defaultValue={this.state.item.price} placeholder="Price..."  onChange={event => this.setPriceValue(event.target.value)}/>
          <ItemSuppliersEditor suppliers = {this.state.item.suppliers}/>
          <ItemPriceReductionsEditor priceReductions = {this.state.item.priceReductions}/>
          <button className="action-button form-button" onClick={this.editItem}>Accept</button>
        </div>
      </div>
    )
  }
}
