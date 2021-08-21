import {User} from "../api/datatype";

export const getCurrentUser = () => {
  const savedUser = localStorage.getItem("currUser")
  if (savedUser === null) return null;
  else return JSON.parse(savedUser) as User;
}