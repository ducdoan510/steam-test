import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {fetchImages, fetchUser} from "../api/apiCall";
import {
  Alert,
  Avatar, Button,
  Card,
  Col,
  Empty,
  Modal,
  notification,
  Row,
  Typography
} from "antd";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import {AlbumForm} from "./AlbumForm";

export const Albums = () => {
  const { username } = useParams()
  const [errMessage, setErrMessage] = useState("")
  const [albums, setAlbums] = useState([])
  const [images, setImages] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteAlbum, setDeleteAlbum] = useState(0)
  const [showAddAlbum, setShowAddAlbum] = useState(false)
  const [newAlbum, setNewAlbum] = useState({})

  useEffect(() => {
    async function getImages() {
      if (username !== "") {
        const user = await fetchUser(username)
        if (user === null) {
          setErrMessage(`No user with username ${username}`)
          return
        }
        setErrMessage("")
        const [al, imgs] = await fetchImages(user)
        setAlbums(al)
        setImages(imgs)
      }
    }
    getImages();
  }, [username])

  const removeAlbum = () => {
    setShowDeleteModal(false)
    setAlbums(currAlbums => currAlbums.filter(album => album.id !== deleteAlbum.id))
    notification.success({
      message: "Deleted successfully"
    })
    setDeleteAlbum(null)
  }

  const cancelRemoveAlbum = () => {
    setShowDeleteModal(false)
    setDeleteAlbum(null)
  }

  const onDeleteClicked = (album) => {
    setShowDeleteModal(true)
    setDeleteAlbum(album)
  }

  const createNewAlbum = () => {
    setAlbums(currAlbums => [...currAlbums, newAlbum])
    setShowAddAlbum(false)
    setNewAlbum({title: "", description: ""})
  }

  const cancelNewAlbum = () => {
    setShowAddAlbum(false)
    setNewAlbum({title: "", description: ""})
  }

  const getAlbumDescription = (album) => {
    const imageCount = images.reduce((count, image) => image.albumid === album.id ? count + 1 : count, 0)
    return `[${imageCount} images] ${album.description}`
  }

  return (
    <>
      <Typography.Title>My Albums</Typography.Title>
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
      {
        albums.length > 0 ? (
          <>
            {
              albums.map(album => (
                <Row>
                  <Col span={24}>
                    <Card>
                      <Card style={{ marginTop: 16 }}
                            actions={[
                              <Link to={`/albums/${username}/${album.id}`}><EyeOutlined key="ellipsis"/></Link>,
                              <DeleteOutlined key="setting" onClick={() => onDeleteClicked(album)}/>,
                            ]}>
                        <Meta
                          avatar={
                            <Avatar src="https://www.vippng.com/png/detail/32-329229_image-add-album-basic-camera-galery-photo-picture.png" />
                          }
                          title={`Album Title: ${album.title}`}
                          description={getAlbumDescription(album)}
                        />
                      </Card>
                    </Card>
                  </Col>
                  <br/>
                </Row>
              ))
            }
            <Modal title="Delete Album?" visible={showDeleteModal} onOk={removeAlbum} onCancel={cancelRemoveAlbum}>
              You are about to delete album titled <b>{deleteAlbum ? deleteAlbum.title : ""}</b>
            </Modal>
          </>
        ) : <Empty/>
      }
      <Button type="primary" block onClick={() => setShowAddAlbum(true)}>Add New Album</Button>
      <Modal title="Add New Album" visible={showAddAlbum} onCancel={cancelNewAlbum} onOk={createNewAlbum}>
        <AlbumForm id="new-album" onCreateAlbum={setNewAlbum} album={newAlbum}/>
      </Modal>
    </>
  )
}