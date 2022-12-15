const express = require('express')
const userRouter = require(`./users/users-router`)

const server = express()

server.use(express.json())
server.use(`/api`, userRouter)

server.get(`/`, (req, res) => {
   res.json(`Hello world!`)
})

server.use((err, req, res, next) => {
   res.status(err.status || 500).json({
      message: err.message || `internal server error`
   })
})

module.exports = server