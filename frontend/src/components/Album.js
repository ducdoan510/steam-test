import React from "react";
import {useParams} from "react-router-dom";

export const Album = () => {
  const { albumid } = useParams()
  return (
    <div>{ albumid }</div>
  )
}