export interface User {
  id: number 
  name: string 
}

export interface Post {
  id: number 
  content: string 
  userId: number 
}

export interface Comment {
  id: number 
  postid: number 
  userid: number 
  content: string 
}

export interface Image {
  id: number 
  albumid: number 
  url: string 
}

export interface Album {
  id: number
  userid: number 
  title: string 
  description: string 
}