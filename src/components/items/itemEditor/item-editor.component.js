import { Component } from "react";
import { ItemsApi } from "../../../api/items.api";
import "./item-editor.component.scss";

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
      console.log(item.priceReductions)
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

  formatDate = (date) => {
    return new Date(date).toLocaleString().split(',')[0];
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
          <div className="suppliers">
          <div className="list-wrapper">
              <h4>Suppliers</h4>
              <ul className="suppliers-list">
              {
                this.state.item.suppliers?.map(supplier => <li key={supplier.id}>
                  {supplier.name + ' (' +  supplier.country + ')'}
                </li>)
              }
                <li><button>New supplier</button></li>
              </ul>
            </div>
          </div>
          <div className="priceReductions">
          <h4>Price Reductions</h4>
              <ul className="price-reductions-list">
              {
                this.state.item.priceReductions?.map(priceReduction => <li key={priceReduction.id}>
                  {'- ' + priceReduction.reducedPrice + ' FROM ' + this.formatDate(priceReduction.startDate) + ' TO ' +  this.formatDate(priceReduction.endDate)}
                </li>)
              }
                <li><button>New price reduction</button></li>
              </ul>
          </div>
          <button className="action-button form-button" onClick={this.editItem}>Accept</button>
        </div>
      </div>
    )
  }
}
