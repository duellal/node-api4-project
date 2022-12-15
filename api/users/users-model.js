const {nanoid} = require(`nanoid`)

function getID(){
   return nanoid().slice(0, 5)
}

function getPass(){
   return nanoid().slice(0, 10)
}

const initialUsers = () => ([
   {id: getID(), username: `Rando`, password: getPass()},
   {id: getID(), username: `Jackie`, password: getPass()},
   {id: getID(), username: `Anistesia`, password: getPass()}
])

let users = initialUsers()

const find = () => {
   return Promise.resolve(users)
}

const findById = id => {
   const user = users.find(user => {user.id === id})
   return Promise.resolve(user)
}

const findByUsername = username => {
   const user = users.find(user => user.username === username)
   return Promise.resolve(user)
}

const insert = ({username, password}) => {
   const newUser = {id: getID(), username, password}
   users.push(newUser)
   return Promise.resolve(newUser)
}

const remove = id => {
   const user = users.find(user => user.id === id)
   if(!user){
      return Promise.resolve(null)
   }else{
   users = users.filter(user => user.id !== id)
   return Promise.resolve(user)
   }
}

const resetDB = () => {
   users = initialUsers()
}

module.exports = {
   find,
   findById, 
   findByUsername,
   insert,
   remove,
   resetDB
}