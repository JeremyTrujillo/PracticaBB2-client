import logo from './logo.svg';
import './App.scss';

export default function App() {

  const logout = () => {
    localStorage.clear();
  }

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
          <a href="/users">Users</a>
        </div>
        <div className="login-wrapper">
          <a href="/login">Login</a>
          <a href="/" onClick={logout}>Logout</a>
        </div>
      </div>
    </div>
  );
}
