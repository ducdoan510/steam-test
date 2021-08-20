import {User} from "./datatype";

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