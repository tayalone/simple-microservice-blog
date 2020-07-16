const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  //   res.send(posts)
  const { id } = req.params
  res.send(commentsByPostId[id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body
  let comments = commentsByPostId[req.params.id]

  if (!comments) {
    comments = [{ id: commentId, content }]
  } else {
    comments.push({ id: commentId, content })
  }

  commentsByPostId[req.params.id] = comments

  console.log(`/posts/:id/comments`)
  res.status(201).send(comments)
})

app.listen(4001, () => {
  console.log(`Listening on 4001`)
})
