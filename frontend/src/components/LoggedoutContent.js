import React, {useEffect, useState} from "react";
import {Form, Layout, Input, Typography, Button, Alert} from "antd";
import {fetchUser} from "../api/apiCall";

const {Content} = Layout

export const LoggedoutContent = ({onUserChange}) => {
  const [errMessage, setErrMessage] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    async function getUser() {
      if (username !== "") {
        const user = await fetchUser(username)
        if (user === null) {
          setErrMessage(`No user with username ${username}`)
        } else {
          setErrMessage("")
          onUserChange(user)
        }
      }
    }
    getUser()
  }, [username, onUserChange])

  const onUsernameChange = (values) => {
    setUsername(values.username)
  }

  return (
    <Layout className="site-layout-background" style={{ padding: '24px 0'}}>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Typography.Title>Sign In</Typography.Title>
        {
          errMessage !== "" ? (
            <>
            <Alert
              message="Error"
              description={errMessage}
              type="error"
              showIcon/>
            <br/>
            </>
          ) : null
        }
        <Form
          name="login"
          labelCol={{span: 2}}
          wrapperCol={{span: 22}}
          onFinish={onUsernameChange}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2, span: 22 }}>
            <Button type="primary" htmlType="submit">
              Let me in!
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}