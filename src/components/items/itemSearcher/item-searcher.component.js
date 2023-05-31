import { Component } from "react";
import "./item-searcher.component.scss";
import { ItemsApi } from "../../../api/items.api";
import ItemViewerComponent from "../itemViewer/item-viewer.component";

const itemsApi = new ItemsApi();
export default class ItemSearcherComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemCode: '',
      itemCodeEmptyError: false,
      itemNotFoundError: false
    }
  }

  findAll = () => {
    this.setState({itemCodeEmptyError: false, itemNotFoundError: false});
    itemsApi.findAll().then((response) => {
      this.setState({items: response.data});
    }).catch((error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    });
  }

  findByItemCode = () => {
    this.setState({itemCodeEmptyError: false, itemNotFoundError: false});
    if (this.state.itemCode === '') {
      this.setState({itemCodeEmptyError: true})
      return;
    }
    itemsApi.findByCode(this.state.itemCode).then((response) => {
      this.setState({items: [response.data]});
      this.props.foundItems([response.data]);
    }).catch((error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      if (error.response?.status === 404) {
        this.setState({items: [], itemNotFoundError: true})
      }
    })
  }

  findActive = () => {
    this.setState({itemCodeEmptyError: false, itemNotFoundError: false});
    itemsApi.findActive().then((response) => {
      this.setState({items: response.data});
      this.props.foundItems(response.data);
    }).catch((error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    });
  }

  findDiscontinued = () => {
    this.setState({itemCodeEmptyError: false, itemNotFoundError: false});
    itemsApi.findDiscontinued().then((response) => {
      this.setState({items: response.data});
      this.props.foundItems(response.data);
    }).catch((error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    });
  }

  
  findCheapestPerSupplier = () => {
    this.setState({itemCodeEmptyError: false, itemNotFoundError: false});
    itemsApi.findCheapestPerSupplier().then((response) => {
      this.setState({items: response.data});
      this.props.foundItems(response.data);
    }).catch((error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    });
  }

  setItemCode = (value) => {
    this.setState({itemCode: value});
    this.setState({itemCodeEmptyError: false, itemNotFoundError: false});
  }

  render() {
    return(
      <div className="item-searcher">
        <h2>Searcher</h2>
        <button onClick={this.findAll}>Find All</button>
        <button onClick={this.findByItemCode}>Find by item code</button>
        <input type="number" placeholder="Item code..." onChange={event => this.setItemCode(event.target.value)}></input>
        { this.state.itemCodeEmptyError ? <span className={'error'}>Item code is empty</span> : null}
        <div className="state">
          <span>Find by state: </span>
          <button onClick={this.findActive}>Find active</button>
          <button onClick={this.findDiscontinued}>Find discontinued</button>
        </div>
        <button onClick={this.findCheapestPerSupplier}>Find cheapest per supplier</button>
        { this.state.itemNotFoundError ? <span className={'error'}>Item not found</span> : null}
        <div className="list-wrapper">
            <h4>Items list</h4>
            <ul className="items-list">
            {
              this.state.items.map(item => <li key={item.id}><ItemViewerComponent item={item}/></li>)
            }
            </ul>
          </div>
      </div>
    )
  }
}
