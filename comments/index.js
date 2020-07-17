const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { randomBytes } = require('crypto')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  //   res.send(posts)
  const { id } = req.params
  res.send(commentsByPostId[id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body
  let comments = commentsByPostId[req.params.id] || []

  comments.push({ id: commentId, content, status: 'pending' })

  commentsByPostId[req.params.id] = comments

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      postId: req.params.id,
      content,
      status: 'pending'
    }
  })

  res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
  const { type, data } = req.body
  console.log('Recieved Event', type)
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data
    const comments = commentsByPostId[postId]

    const commentIndex = comments.findIndex((comment) => comment.id === id)
    comments[commentIndex].status = status

    commentsByPostId[postId] = comments
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: { postId, id, status, content }
    })
  }
  res.send({})
})

app.listen(4001, () => {
  console.log(`Listening on 4001`)
})
