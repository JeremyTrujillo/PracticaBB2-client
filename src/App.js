import logo from './logo.svg';
import './App.scss';

export default function App() {

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  const loggedUser = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  return (
    <div className={"App"}>
      <div className={"header-wrapper"}>
        <div className="logo">
          <a href="/">
            <img src={logo} alt="App logo"/>
          </a>
        </div>
        <div className="navigation-wrapper">
          <a href="/items">Items</a>
          { role === "ADMIN" ? <a href="/users">Users</a> : null }
        </div>
        <div className="login-wrapper">
          { loggedUser  !== null ? <a href="/" onClick={logout}>Logout</a> : <a href="/login">Login</a> }
        </div>
      </div>
    </div>
  );
}
