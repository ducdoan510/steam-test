import React, {useEffect, useState} from "react";
import {fetchPosts, fetchUsers} from "../api/apiCall";
import {getCurrentUser} from "../util/userHelper";
import {Post} from "./Post";
import {Button, Card, Input} from "antd";

export const Posts = ({ username, showAddNewPost }) => {
  const [posts, setPosts] = useState([])
  const [userMap, setUserMap] = useState([])
  const [newPostContent, setNewPostContent] = useState("")

  useEffect(() => {
    async function getPosts() {
      const displayPosts = await fetchPosts(username)
      setPosts(displayPosts[1])

      const users = await fetchUsers();
      setUserMap(users.reduce((curr, user) => ({...curr, [user.id]: user.name}), {}))
    }
    getPosts()
  }, [username])

  const deletePost = (post) => {
    setPosts(currPosts => currPosts.filter(p => p.content !== post.content))
  }

  const postNew = () => {
    const newPost = {
      content: newPostContent,
      userid: getCurrentUser().id,
      id: new Date().getTime()
    }
    setPosts((currPosts) => [...currPosts, newPost])
    setNewPostContent("")
  }

  return (
    <>
      {
        showAddNewPost ? <>
          <Card style={{marginTop: "16px"}}>
            <Input.TextArea
              rows={4}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Write a new post..."/>
            <br/>
            <Button type="primary" block onClick={postNew}>Add New Post</Button>
          </Card>
        </> : null
      }
      {
        posts.map(post => <Post id={post.id} post={post} userMap={userMap} onDeletePost={deletePost}/>)
      }
    </>
  )
}