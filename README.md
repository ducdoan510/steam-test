# STEAM Assignment

This assignment comprises of creating a sample db to be integrated with [JSON Placeholder API](https://jsonplaceholder.typicode.com/) and simple frontend that display users' post and albums.

## Installation

Make sure the ```npm >= 6.14.6``` and ```node >= ```12.8.3```. To start the frontend

```bash
1. cd frontend
2. npm install
3. npm start
```

## Data Schema
```
User
  - id: number 
  - name: string 

Post
  - id: number 
  - content: string 
  - userid: number

Comment
  - id: number 
  - postid: number 
  - userid: number 
  - content: string 

Image
  - id: number 
  - albumid: number 
  - url: string 

Album 
  - id: number
  - userid: number 
  - title: string 
  - description: string
```

## Data Generation
All data displayed in this project are mocked and randomly generated with the help of
- [Random Text API](http://hipsum.co/api/?type=hipster-centric)
- [Cat Image API](https://api.thecatapi.com)

The generation script can be found in ```scripts``` folder. To run the script
1. pip install -r requirements.txt
2. python db_generation.py

## Usage
Once the page starts up, users can take the following actions:
1. Sign in using a username in the system, e.g. Elizabeth
2. Once signed in, user can log out if needed, otherwise the username will persist
3. On <b>My Posts</b> page, users can add, edit, delete posts and add comments also
4. On <b>Feed</b> page, users can view and comment on other users' posts
5. On <b>My Albums</b> page, users and view, add, and delete their albums info. User can click on view detail symbols to view the carousel of images in each album

## Possible Improvement
1. The ability to search posts by text. Possible approach could be indexing post data with Elasticsearch
2. Users can add privacy preference for their posts
3. Manage storage of posts and images if backend is built from scratch

TODO
