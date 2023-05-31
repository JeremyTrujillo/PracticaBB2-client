import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import ItemsComponent from "./components/items/items.component";
import LoginComponent from "./components/login/login.component";
import UsersComponent from "./components/users/users.component";
import ItemCreatorComponent from "./components/items/itemCreator/item-creator.component";
import ItemSearcherComponent from "./components/items/itemSearcher/item-searcher.component";
import ItemEditorComponent from "./components/items/itemEditor/item-editor.component";
import UserCreatorComponent from "./components/users/userCreator/user-creator-component";

export default function Routing() {

  const Auth = () => {
    const role = localStorage.getItem("role");
    return role === "ADMIN" ? <UsersComponent/> : <Navigate to="/items" replace />;
  };

  return(
    <BrowserRouter>
      <Routes>
        <Route path = "users" element = {<Auth/>}>
          <Route path = "new" element={<UserCreatorComponent/>}/>
        </Route>
        <Route path = "login" element = {<LoginComponent/>} />
        <Route path = "items" element= {<ItemsComponent/>}>
          <Route path = "" element = {<ItemSearcherComponent/>}/>
          <Route path = "new" element = {<ItemCreatorComponent/>}/>
          <Route path = "edit/:itemId" element = {<ItemEditorComponent/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/items" replace />}/>
      </Routes>
    </BrowserRouter>  
  )
}
