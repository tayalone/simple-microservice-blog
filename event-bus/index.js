const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
app.use(bodyParser.json())

const events = []

app.post('/events', (req, res) => {
  const { body: event } = req
  events.push(event)

  //const url1 = 'http://localhost:4000/events' // localhost
  const url1 = 'http://posts-clusterid-srv:4000/events'

  axios.post(url1, event)
  // axios.post('http://localhost:4001/events', event)
  // axios.post('http://localhost:4002/events', event)
  // axios.post('http://localhost:4003/events', event)

  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log(`Listening on 4005`)
})
