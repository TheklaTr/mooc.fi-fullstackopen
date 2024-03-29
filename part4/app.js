const express = require('express')
const config = require('./utils/config')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true,
})

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app
