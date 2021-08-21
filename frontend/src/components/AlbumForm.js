import React from "react";
import {Form, Input} from "antd";

export const AlbumForm = ({ album, onCreateAlbum }) => {
  const onValuesChanged = (values) => {
    onCreateAlbum((currAlbum => ({...currAlbum, ...values})))
  }

  return (
    <Form
      name="login"
      labelCol={{span: 6}}
      wrapperCol={{span: 18}}
      onValuesChange={onValuesChanged}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input album title!' }]}>
        <Input defaultValue={album ? album.title : ""}/>
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input album description!' }]}>
        <Input defaultValue={album ? album.description : ""}/>
      </Form.Item>
    </Form>
  )
}