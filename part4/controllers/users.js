const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
   const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1,
   })
   res.json(users)
})

usersRouter.post('/', async (req, res) => {
   const body = req.body

   const password = body.password
   if (!password) {
      return res.status(400).send({ error: 'password is required' })
   } else if (password.length < 3) {
      return res
         .status(400)
         .send({ error: 'password must at least 3-character long' })
   }

   const saltRounds = 10
   const passwordHash = await bcrypt.hash(password, saltRounds)

   const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
   })

   const savedUser = await user.save()

   res.json(savedUser)
})

module.exports = usersRouter
