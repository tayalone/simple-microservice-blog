const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body
  posts[id] = {
    id,
    title
  }

  // const url = 'http://localhost:4005/events' // localhost
  const url = 'http://event-bus-srv:4005/events' // k8s **cluster ip service
  await axios.post(url, {
    type: 'PostCreated',
    data: { id, title }
  })

  res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  const { type } = req.body
  console.log('Recieved Event', type)
  res.send({})
})

app.listen(4000, () => {
  console.log(`Listening on 4000`)
})
