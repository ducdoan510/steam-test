import {
  BrowserRouter as Router, Link,
} from "react-router-dom";
import 'antd/dist/antd.css'
import {Layout, Menu} from 'antd';
import './App.css';
import React, {useState} from "react";
import {LoggedInContent} from "./components/LoggedInContent";
import {LoggedoutContent} from "./components/LoggedoutContent";
import {getCurrentUser} from "./util/userHelper";

const { Header, Content } = Layout;

function App() {
  const [user, setUser] = useState(getCurrentUser() || {
    id: 0,
    name: ""
  })

  const setLocalUser = (user) => {
    localStorage.setItem("currUser", JSON.stringify(user))
    setUser(user)
  }

  const logOut = () => {
    localStorage.removeItem("currUser");
    setUser({
      id: 0,
      name: ""
    })
  }

  const onHeaderClick = ({key}) => {
    if (key === "logout") logOut()
  }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" onClick={onHeaderClick}>
            {
              user.id === 0 ? (
                <Menu.Item key="welcome"><Link to="/home">Welcome to STEAM</Link></Menu.Item>
              ) : (
                <>
                  <Menu.Item key="welcome"><Link to="/home">Welcome to STEAM, {user.name}</Link></Menu.Item>
                  <Menu.Item key="logout"><Link to="/home">Log out</Link></Menu.Item>
                </>
              )
            }
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {
            user.id === 0 ? <LoggedoutContent onUserChange={setLocalUser}/> : <LoggedInContent/>
          }
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
