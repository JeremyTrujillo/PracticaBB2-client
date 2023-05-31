import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "./items.component.scss";
import { Outlet } from "react-router-dom";
import ItemCreatorComponent from "./itemCreator/item-creator.component";
import ItemSearcherComponent from "./itemSearcher/item-searcher.component";
import ItemEditorComponent from "./itemEditor/item-editor.component";
import ItemViewerComponent from "./itemViewer/item-viewer.component";


export default class ItemsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      editItemCode: 0
    }
  }

  changeURL = (url) => {
    window.location.href = url;
  }

  foundItems = (data) => {
    this.setState({items: data})
  }

  editItem = (item) => {
    this.state.editItemCode = item.itemCode;
    window.location.href =  "/items/edit/" + item.id;
  }

  render() {
    return (
      <div className={"items"}>
        <div className="items-wrapper wrapper">
          <h2>Items</h2>
          <div className="function-wrapper content">
            <div className={"button-wrapper "+ (window.location.pathname !== "/items" ? "cancel" : '') }>
              { window.location.pathname === "/items" ?
              <button className="button-icon" ><i title="Create item" onClick={this.changeURL.bind(this, "/items/new")}>+</i></button>
                :
                <button className="button-icon"><i title="Cancel" onClick={this.changeURL.bind(this, "/items")}>+</i></button> }
            </div>
            <Routes>
              <Route path = "new" element = {<ItemCreatorComponent/>}/>
              <Route path = "edit/:itemId" element = {<ItemEditorComponent />}/>
              <Route exact path = "/" element = {<ItemSearcherComponent foundItems={this.foundItems}/>}/>
            </Routes>
            <Outlet />
          </div>
          { window.location.pathname === "/items" ? 
            <div className="list-wrapper">
              <h4>Items list</h4>
              <ul className="items-list">
              {
                this.state.items.map(item => <li key={item.id}><ItemViewerComponent item={item} editItem={this.editItem}/></li>)
              }
              </ul>
            </div>
         : null }          
        </div>
      </div>
    )
  }
}
