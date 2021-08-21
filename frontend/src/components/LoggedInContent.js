import React from "react";
import {Layout, Menu} from "antd";
import {FileImageOutlined, UserOutlined, FundProjectionScreenOutlined} from "@ant-design/icons";
import {Link, Route, Switch} from "react-router-dom";
import {MyPosts} from "./MyPosts";
import {Feed} from "./Feed";
import {Albums} from "./Albums";
import {Album} from "./Album";
import {getCurrentUser} from "../util/userHelper";
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
          <Menu.Item key="album" icon={<FileImageOutlined />}>
            <Link to={`/albums/${getCurrentUser().name}`}>My Albums</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Switch>
          <Route exact path="/home">
            <MyPosts/>
          </Route>
          <Route exact path="/feed">
            <Feed/>
          </Route>
          <Route exact path="/albums/:username">
            <Albums/>
          </Route>
          <Route exact path="/albums/:username/:albumid">
            <Album/>
          </Route>
        </Switch>
      </Content>
    </Layout>
  )
}