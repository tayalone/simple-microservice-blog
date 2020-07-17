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
  let comments = commentsByPostId[req.params.id]

  if (!comments) {
    comments = [{ id: commentId, content }]
  } else {
    comments.push({ id: commentId, content })
  }

  commentsByPostId[req.params.id] = comments

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      postId: req.params.id,
      content
    }
  })

  res.status(201).send(comments)
})

app.post('/events', (req, res) => {
  const { type } = req.body
  console.log('Recieved Event', type)
  res.send({})
})

app.listen(4001, () => {
  console.log(`Listening on 4001`)
})
