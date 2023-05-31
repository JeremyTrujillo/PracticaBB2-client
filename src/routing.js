import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ItemsComponent from "./components/items/items.component";
import LoginComponent from "./components/login/login.component";
import UsersComponent from "./components/users/users.component";
import UserCreatorComponent from "./components/users/userCreator/user-creator-component";

export default function Routing() {

  const UserAuth = () => {
    const role = localStorage.getItem("role");
    return role === "ADMIN" ? <UsersComponent/> : <Navigate to="/items" replace />;
  };

  return(
    <BrowserRouter>
      <Routes>
        <Route path = "users" element = {<UserAuth/>}>
          <Route path = "new" element={<UserCreatorComponent/>}/>
        </Route>
        <Route path = "login" element = {<LoginComponent/>} />
        <Route path = "items/*" element= {<ItemsComponent/>}/>
        <Route path="*" element={<Navigate to="/items" replace />}/>
      </Routes>
    </BrowserRouter>
  )
}
