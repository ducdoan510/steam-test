import React from "react";
import {Layout, Menu} from "antd";
import {FileImageOutlined, UserOutlined, FundProjectionScreenOutlined} from "@ant-design/icons";
import {Link, Route, Switch} from "react-router-dom";
import {MyPosts} from "./MyPosts";
import {Feed} from "./Feed";
import {Albums} from "./Albums";
const { Content, Sider } = Layout;

export const LoggedInContent = () => {
  return (
    <Layout className="site-layout-background" style={{ padding: '24px 0'}}>
      <Sider className="site-layout-background" width={200}>
        <Menu
          mode="inline"
          style={{ height: '100%' }}>
          <Menu.Item key="posts" icon={<UserOutlined/>}><Link to="/home">My Posts</Link></Menu.Item>
          <Menu.Item key="feed" icon={<FundProjectionScreenOutlined />}><Link to="/feed">Feed</Link></Menu.Item>
          <Menu.Item key="album" icon={<FileImageOutlined />}><Link to="/albums">My Albums</Link></Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Switch>
          <Route path="/home">
            <MyPosts/>
          </Route>
          <Route path="/feed">
            <Feed/>
          </Route>
          <Route path="/albums">
            <Albums/>
          </Route>
        </Switch>
      </Content>
    </Layout>
  )
}