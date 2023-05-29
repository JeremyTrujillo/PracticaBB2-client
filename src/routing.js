import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemsComponent from "./components/items/items.component";
import LoginComponent from "./components/login/login.component";
import UsersComponent from "./components/users/users.component";
import ItemCreatorComponent from "./components/items/itemCreator/item-creator.component";
import ItemSearcherComponent from "./components/items/itemSearcher/item-searcher.component";
import ItemEditorComponent from "./components/items/itemEditor/item-editor.component";

export default function Routing() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/*" element = {<ItemsComponent/>} /> 
        <Route path = "/items/*" element = {<ItemsComponent/>} /> 
        <Route path = "users/*" element = {<UsersComponent/>} /> 
        <Route path = "login" element = {<LoginComponent/>} /> 
        <Route path = "/items" element= {<ItemsComponent/>}>
          <Route path = "" element = {<ItemSearcherComponent/>}/>
          <Route path = "new" element = {<ItemCreatorComponent/>}/>
          <Route path = "edit/:itemId" element = {<ItemEditorComponent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>  
  )
}
