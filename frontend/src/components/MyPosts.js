import React from "react";
import {Posts} from "./Posts";
import {getCurrentUser} from "../util/userHelper";

export const MyPosts = () => {
  return (
    <Posts showAddNewPost={true} username={getCurrentUser().name}/>
  )
}