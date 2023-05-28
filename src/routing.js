import { useRoutes } from "react-router-dom";
import ItemsComponent from "./components/items/items.component";
import LoginComponent from "./components/login/login.component";
import UsersComponent from "./components/users/users.component";

export default function Routing() {

  return useRoutes([
    {
      path: "/",
      element: <ItemsComponent/>
    },
    {
      path: "/items",
      element: <ItemsComponent/>
    },
    {
      path: "/login",
      element: <LoginComponent/>
    },
    {
      path: "/users",
      element: <UsersComponent/>
    },
  ]);
}
