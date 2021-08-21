import React, {useState} from "react";
import {Col, Input, Popconfirm, Row, Space} from "antd";
import {getCurrentUser} from "../util/userHelper";
import {SendOutlined} from "@ant-design/icons";

export const Comment = ({ comment, userMap, onDeleteComment }) => {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(comment.content)
  const [newContent, setNewContent] = useState(comment.content)

  const editComment = () => {
    setEditing(true)
  }

  const updateComment = () => {
    setContent(newContent)
    setNewContent("")
    setEditing(false)
  }

  return (
    <>
      <Row>
        <Col offset={1} span={2}><b>{userMap[comment.userid]}</b></Col>
        <Col span={editing ? 18 : 21}>
        {
          editing ? <Input value={newContent} onChange={(e) => setNewContent(e.target.value)}/> : content
        }
        </Col>
        {
          editing ? <Col offset={1} span={1}>
            <SendOutlined onClick={updateComment}/>
          </Col> : null
        }
      </Row>
      {
        comment.userid !== getCurrentUser().id ? null : (
          <Row>
            <Col offset={3}>
              <Space direction="horizontal">
                <Popconfirm
                  title={"Delete this comment?"}
                  onConfirm={() => onDeleteComment(comment)}>
                  <a href="#">Delete</a>
                </Popconfirm>
                <Popconfirm
                  title={"Edit this comment?"}
                  onConfirm={editComment}>
                  <a href="#">Edit</a>
                </Popconfirm>
              </Space>
            </Col>
          </Row>
        )
      }
    </>
  )
}