import React, { useState } from 'react'
import axios from 'axios'

const PostCreate = () => {
  const [title, setTitle] = useState('')

  const onSubmit = async (event) => {
    try {
      event.preventDefault()
      await axios.post('http://posts.com/posts/create', { title })
      setTitle('')
    } catch (e) {
      console.log(`e`, e)
      alert('some thing wrong')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          ></input>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default PostCreate
