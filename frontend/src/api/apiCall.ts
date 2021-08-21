import {Album, Comment, Image, Post, User} from "./datatype";

const DOMAIN_URL = "https://my-json-server.typicode.com/ducdoan510/steam-test"

const fetchData = async (postfix: string) => {
  try {
    const response = await fetch(`${DOMAIN_URL}/${postfix}`)
    const json = await response.json()
    return json
  } catch (err) {
    console.log(err)
  }
}

export const fetchUsers = async () => {
  const users: User[] = await fetchData("users")
  return users || []
}

export const fetchUser = async (username: string) => {
  const users: User[] = await fetchUsers()
  const user = users.filter(user => user.name === username)
  return user.length > 0 ? user[0] : null
}

export const fetchAlbums = async (user: User) => {
  const albums: Album[] = await fetchData("albums") || []
  return albums.filter(album => album.userid === user.id)
}

export const fetchImages = async (user: User) => {
  const albums: Album[] = await fetchAlbums(user)
  const albumids: number[] = albums.map(album => album.id)
  const images: Image[] = (await fetchData("images") || []).filter((image: Image) => albumids.includes(image.albumid))
  return [albums, images]
}

export const fetchAlbum = async (albumid: number) => {
  const albums: Album[] = (await fetchData("albums")).filter((album: Album) => album.id === albumid)
  const album = albums[0]
  const allImages: Image[] = await fetchData("images")
  const images = allImages.filter(image => image.albumid === albumid)
  return [album, images]
}

export const fetchPosts = async (username: string) => {
  const users: User[] = await fetchUsers()
  const filteredUsers = users.filter(user => user.name === username)
  const user = filteredUsers.length > 0 ? filteredUsers[0] : null
  const posts = await fetchData("posts")
  if (user === null) {
    return [null, posts]
  }
  return [user, posts.filter((post: Post) => post.userid === user.id)]
}

export const fetchComments = async (postid: number) => {
  const comments: Comment[] = await fetchData("comments")
  const postComments = comments.filter((comment: Comment) => comment.postid === postid)
  return postComments
}