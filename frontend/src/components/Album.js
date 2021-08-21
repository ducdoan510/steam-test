import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {fetchAlbum} from "../api/apiCall";
import {Breadcrumb, Button, Carousel, Empty, Image, Input, Modal, Typography, message} from "antd";
import {getCurrentUser} from "../util/userHelper";

export const Album = () => {
  const { albumid } = useParams()
  const [images, setImages] = useState([])
  const [showNewImage, setShowNewImage] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    async function getAlbumImages() {
      const album = await fetchAlbum(parseInt(albumid))
      setImages(album[1])
    }
    message.success("Click on image to see correct-sized image")
    getAlbumImages()
  }, [albumid])

  const cancelNewImage = () => {
    setShowNewImage(false)
    setImageUrl("")
  }

  const saveNewImage = () => {
    setShowNewImage(false)
    if (imageUrl !== "") setImages(currImages => [{url: imageUrl, albumid: albumid}, ...currImages])
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to={`/albums/${getCurrentUser().name}`}>My Albums</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Album Detail</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title>Album Detail</Typography.Title>
      {
        images.length === 0 ? <Empty/> : (
          <Image.PreviewGroup>
            <Carousel autoplay>
              {
                images.map(image =>
                  <Image key={image.id} src={image.url} width="100%" height={600}/>
                )
              }
            </Carousel>
          </Image.PreviewGroup>
        )
      }
      <Button type="primary" block onClick={() => setShowNewImage(true)}>Add New Image</Button>
      <Modal title="Add New Image" visible={showNewImage} onCancel={cancelNewImage} onOk={saveNewImage}>
        <Typography.Text>New Image URL:</Typography.Text>
        <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
      </Modal>
    </>
  )
}