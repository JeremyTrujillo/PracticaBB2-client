import React, { Component } from "react";
import "./items.component.scss";
import {  Outlet } from "react-router-dom";

export default class ItemsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  setItems = (data) => {
    this.setState({items: data});
  }

  changeURL = (url) => {
    window.location.href = url;
  }

  render() {
    return (
      <div className={"items"}>
        <div className="items-wrapper wrapper">
          <h2>Items</h2>
          <div className="function-wrapper content">
            <div className={"button-wrapper "+ (window.location.pathname === "/items/new" ? "cancel" : '') }>
              { window.location.pathname !== "/items/new" ?
              <button className="button-icon" ><i title="Create item" onClick={this.changeURL.bind(this, "/items/new")}>+</i></button>
                :
                <button className="button-icon"><i title="Cancel" onClick={this.changeURL.bind(this, "/items")}>+</i></button> }
            </div>
            <Outlet />
          </div>
        </div>
      </div>        
    )
  }
}
