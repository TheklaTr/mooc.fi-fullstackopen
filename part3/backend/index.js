require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

// activate json-parser for POST
app.use(bodyParser.json())

// app.use(morgan('tiny'));

// create new token
morgan.token('body', (request, response) => {
  if (request.method !== 'POST') return
  return JSON.stringify(request.body)
})

// predefined token
app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms :body`)
)

// let persons = [
//   {
//     name: 'Arto Hellas',
//     number: '040-123456',
//     id: 1,
//   },
//   {
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//     id: 2,
//   },
//   {
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//     id: 3,
//   },
//   {
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//     id: 4,
//   },
// ];

app.get('/', (req, res) => {
  res.send('<h1>Hello To PhoneBook</h1>')
})

// GET all
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons.map((person) => person.toJSON()))
    })
    .catch((error) => next(error))
})

// GET info
app.get('/info', (req, res) => {
  const reqDate = new Date()
  Person.find({})
    .then((persons) => {
      res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${reqDate.toString()}</p>`)
    })
    .catch((error) => next(error))
})

// GET id
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// DELETE id
app.delete('/api/persons/:id', (req, res, next) => {
  console.log(req.params)
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end()
      } else {
        res.status(400).send({
          error: `${result.name} was already deleted`,
        })
      }
    })
    .catch((error) => next(error))
})

// POST
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      res.json(savedAndFormattedPerson)
    })
    .catch((error) => next(error))
})

// PUT: update existing person
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  // Find existing person
  Person.findById(request.params.id)
    .then((person) => {
      const updatedInfo = {
        name: person.name,
        number: body.number,
      }

      // Update number
      Person.findByIdAndUpdate(request.params.id, updatedInfo, {
        new: true,
        runValidators: true, // Update validators
        context: 'query',
      })
        .then((updatedPerson) => {
          response.json(updatedPerson.toJSON())
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// handler of requests with result to errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
