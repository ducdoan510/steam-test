import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {fetchImages, fetchUser} from "../api/apiCall";
import {Alert, Avatar, Card, Carousel, Col, Image, Modal, notification, Row, Typography} from "antd";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import Line from "antd/es/progress/Line";
import Meta from "antd/es/card/Meta";

export const Albums = () => {
  const { username } = useParams()
  const [errMessage, setErrMessage] = useState("")
  const [albums, setAlbums] = useState([])
  const [images, setImages] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteAlbum, setDeleteAlbum] = useState(0)

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
        console.log(imgs)
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
      <Image.PreviewGroup>
        <Carousel autoplay>
          {
            images.map(image =>
                <Image key={image.id} src={image.url} width="100%" height={600}/>
            )
          }
        </Carousel>
      </Image.PreviewGroup>
      <Line/>
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
                    description={album.description}
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
  )
}