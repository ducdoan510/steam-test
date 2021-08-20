import React from "react";

export const Posts = ({ isGlobal }) => {
  return (
    <div>{isGlobal ? "Feed" : "My Posts"}</div>
  )
}