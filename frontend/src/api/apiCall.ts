import {Album, Image, User} from "./datatype";

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

export const fetchUser = async (username: string) => {
  const users: User[] = await fetchData("users") || []
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
  console.log(albums, albumids)
  const images: Image[] = (await fetchData("images") || []).filter((image: Image) => albumids.includes(image.albumid))
  return [albums, images]
}