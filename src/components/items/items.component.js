import { Component } from "react";
import "./items.component.scss";
import { Route, Routes } from "react-router-dom";
import ItemSearcherComponent from "./itemSearcher/item-searcher.component";
import ItemCreatorComponent from "./itemCreator/item-creator.component";
import ItemEditorComponent from "./itemEditor/item-editor.component";
import { ItemsApi } from "../../api/items.api";

const itemsApi = new ItemsApi();
export default class ItemsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: itemsApi.findAll()
    }
  }

  render() {
    return (
      <div className={"items"}>
        Items component
        <div className="function-wrapper">
          <Routes>
            <Route path="/" Component={ItemSearcherComponent}/>
            <Route path="/new" Component={ItemCreatorComponent}/>
            <Route path="/edit" Component={ItemEditorComponent}/>
          </Routes>
        </div>
        <div className="list-wrapper">
          {JSON.stringify(this.state.items)}
        </div>
      </div>
    )
  }
}
