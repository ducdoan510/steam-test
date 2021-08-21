import React, {useEffect, useState} from "react";
import {fetchComments} from "../api/apiCall";
import {Card, Col, Input, Popconfirm, Row, Space, Typography} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {getCurrentUser} from "../util/userHelper";
import {Comment} from "./Comment";

export const Post = ({ post, userMap, onDeletePost }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [editing, setEditing] = useState(false)
  const [newContent, setNewContent] = useState("")
  const [postContent, setPostContent] = useState(post.content)

  useEffect(() => {
    async function getComments() {
      const postComments = await fetchComments(post.id)
      setComments(postComments)
    }
    getComments()
  }, [post])

  const addComment = () => {
    if (newComment !== "")
      setComments(currComments => [...currComments, {
        content: newComment,
        postid: post.id,
        userid: getCurrentUser().id
      }])
    setNewComment("")
  }

  const onDeleteComment = (comment) => {
    setComments(currComments => currComments.filter(cmt => cmt.content !== comment.content))
  }

  const onConfirmEditPost = () => {
    setEditing(true)
    setNewContent(postContent)
  }

  const onUpdatePost = () => {
    setEditing(false)
    setPostContent(newContent)
  }

  return (
    <>
      <Card style={{marginTop: "16px"}}>
        <Row>
          <Space direction="horizontal">
            <div><b>{userMap[post.userid]}</b></div>
            {
              post.userid === getCurrentUser().id ? <>
                <Popconfirm
                  title={"Delete this post?"}
                  onConfirm={() => onDeletePost(post)}>
                  <a href="#">Delete</a>
                </Popconfirm>
                <Popconfirm
                  title={"Edit this comment?"}
                  onConfirm={onConfirmEditPost}>
                  <a href="#">Edit</a>
                </Popconfirm>
              </> : null
            }

          </Space>
        </Row>
        <Row>
          {
            editing ?
              <>
                <Col span={21}><Input.TextArea rows={4} value={newContent} onChange={(e) => setNewContent(e.target.value)}/></Col>
                <Col offset={1} span={1}><SendOutlined onClick={onUpdatePost}/></Col>
              </> :
              <Typography.Paragraph>{postContent}</Typography.Paragraph>
          }
        </Row>
        {
          comments.map(comment => <Comment comment={comment} userMap={userMap} onDeleteComment={onDeleteComment}/>)
        }
        <br/>
        <Row>
          <Col offset={1} span={20}>
            <Input placeholder="Write a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
          </Col>
          <Col offset={1} span={1}>
            <SendOutlined onClick={addComment}/>
          </Col>
        </Row>
      </Card>
    </>
  )
}