import json
import requests
import random
import time


USER_COUNT = 4
AVG_POSTS_PER_USER = 25
AVG_COMMENTS_PER_POST = 5
ALBUMS_PER_USER = 4
IMAGES_PER_ALBUM = 6


def get_text(is_paragraph=True, paras=None, sentences=None):
    url = f"http://hipsum.co/api/?type=hipster-centric"
    if is_paragraph:
        if paras:
            url += f"&paras={paras}"
    else:
        if sentences:
            url += f"&sentences={sentences}"
    resp = requests.get(url)
    text = resp.json()[0]
    time.sleep(random.random())
    return text


def get_cat_images(limit):
    url = f"https://api.thecatapi.com/v1/images/search?limit={limit}&format=json"
    resp = requests.get(url).json()
    cat_urls = [cat["url"] for cat in resp]
    return cat_urls


if __name__ == '__main__':
    # generate users
    users = [
        {
            "id": 1,
            "name": "Sylvie"
        },
        {
            "id": 2,
            "name": "Annie"
        },
        {
            "id": 3,
            "name": "Elizabeth"
        },
        {
            "id": 4,
            "name": "Suni"
        }
    ]

    # generate posts
    posts = []
    for postid in range(1, USER_COUNT * AVG_POSTS_PER_USER + 1):
        posts.append({
            "id": postid,
            "content": get_text(paras=5),
            "userid": random.randint(1, 4)
        })
    print("done posts")

    # generate comments
    comments = []
    for commentid in range(1, USER_COUNT * AVG_POSTS_PER_USER * AVG_COMMENTS_PER_POST + 1):
        comments.append({
            "id": commentid,
            "postid": random.randint(1, 100),
            "userid": random.randint(1, 4),
            "content": get_text(is_paragraph=False, sentences=1)
        })
    print("done comments")

    # generate albums
    albums = []
    for albumid in range(1, USER_COUNT * ALBUMS_PER_USER + 1):
        albums.append({
            "id": albumid,
            "userid": (albumid - 1) // 4 + 1,
            "title": get_text(is_paragraph=False, sentences=1),
            "description": get_text(paras=3)
        })
    print("done albums")

    # generate images
    images = []
    cat_urls = get_cat_images(96)
    for imageid in range(1, USER_COUNT * ALBUMS_PER_USER * IMAGES_PER_ALBUM + 1):
        images.append({
            "id": imageid,
            "albumid": random.randint(1, USER_COUNT * ALBUMS_PER_USER),
            "title": get_text(is_paragraph=False, sentences=1),
            "description": get_text(paras=3),
            "url": cat_urls[imageid - 1]
        })
    print("done images")

    # write to db.json file
    data = {
        "users": users,
        "posts": posts,
        "comments": comments,
        "images": images,
    }
    with open("db.json", "w") as outfile:
        json.dump(data, outfile)
