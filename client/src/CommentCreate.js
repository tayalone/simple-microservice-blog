import React, { useState } from 'react'
import axios from 'axios'
const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('')

  const onSubmit = async (event) => {
    try {
      event.preventDefault()
      await axios.post(`http://localhose:4001/${postId}/comments`, { content })
      setContent('')
    } catch (e) {
      alert('something when wrong')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary"> Submit </button>
      </form>
    </div>
  )
}

export default CommentCreate
