const express = require(`express`)
const Users = require(`./users-model`)
const {validateLogin, validateRegister, validateUserId} = require(`../middleware`)

const router = express.Router()

router.get(`/users`, (req, res, next) => {
   Users.find()
      .then(user => {
      res.status(200).json(user)
      })
      .catch(next)
})

router.post(`/register`, validateRegister, (req, res, next) => {
   Users.insert(req.body)
      .then(user => {
         res.status(201).json(user)
      })
      .catch(next)
})

router.post(`/login`, validateLogin, (req, res, next) => {
   Users.findByUsername(req.body.username)
      .then(user => {
         res.json({message: `Welcome back ${req.body.username}!`})
      })
      .catch(next)
})

//Stretch - not working for some reason
// when a known user id is put in the url, it says that the user with that id does not exist
//not sure if it's the below code or the middleware code that is wrong
router.delete(`/users/:id`, validateUserId, (req, res, next) => {
   Users.remove(req.params.id)
      .then(() => {
         res.status(200).json(req.user)
      })
      .catch(next)
})

module.exports = router