const Users = require(`./users/users-model`)


function validateRegister(req, res, next){
   const {username, password} = req.body

   if(// make sure that username is an unique string with at least one character
      username !== undefined &&
      typeof username === `string` &&
      username.trim().length &&
      Users.findByUsername(username) &&
      //password is at least 6 characters in length
      password !== undefined &&
      password.length >= 6
      ){
         next()
      } else{
         next({
            status: 404, 
            message: `missing an unique username and/or a password with a length of at least 6 characters`
         })
      }}

async function validateLogin(req, res, next){
   const {username, password} = req.body
   const user = await Users.findByUsername(username)

   if(!user){
      next({
         status: 404,
         message: `invalid username and/or password`
      })
   }
   else{ 
      next() 
   }}

async function validateUserId(req, res, next){
   try{
      const {id} = req.params
      const user = await Users.findById(id)

      if(user){
         req.user = user
         next()
      }
      else{
         next({
            status: 404, 
            message: `user with id ${id} not found`
         })
      }}
   catch(err){
      next(err)
   }}

module.exports = {
   validateLogin, 
   validateRegister,
   validateUserId
}