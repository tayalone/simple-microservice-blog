const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

const handlerEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data
    posts[id] = { id, title, comments: [] }
  }
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data
    const post = posts[postId]
    post.comments.push({ id, content, status })
    posts[postId] = post
  }
  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data
    const post = posts[postId]
    const { comments } = post

    const commentIndex = comments.findIndex((comment) => comment.id === id)
    comments[commentIndex].content = content
    comments[commentIndex].status = status

    posts[postId].comments = comments
  }
}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body
  handlerEvent(type, data, res)
  res.send({})
})

app.listen(4002, async () => {
  console.log(`Listening on 4002`)
  // const url = 'http://localhost:4005/events' //old
  const url = 'http://event-bus-srv:4005/events'
  const res = await axios.get(url)
  for (let event of res.data) {
    const { type, data } = event
    console.log('Processing event:', event.type)
    handlerEvent(type, data)
  }
})
