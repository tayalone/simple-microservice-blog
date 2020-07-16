import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    )
    console.log(res.data)
    setComments(res.data)
  }

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>
  })
  return <ul>{renderedComments}</ul>
}

export default CommentList
