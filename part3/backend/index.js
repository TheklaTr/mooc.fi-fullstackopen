const express = require('express');
const app = express();
const morgan = require('morgan');

const cors = require('cors');

app.use(cors());

// app.use(morgan('tiny'));

// create new token
morgan.token('body', (request, response) => {
  if (request.method !== 'POST') return;
  return JSON.stringify(request.body);
});

// predefined token
app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms :body`)
);

// activate json-parser for POST
app.use(express.json());

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello To PhoneBook</h1>');
});

// GET all
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// GET id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log(req.params);

  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).send();
  }

  res.json(person);
});

// DELETE id
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

// POST
app.post('/api/persons', (req, res) => {
  const body = req.body;

  // check name/number is missing
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' });
  }

  // check existing name
  if (
    persons.find(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    )
  ) {
    return res.status(403).json({ error: 'name must be unique' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000 + 1), // generate Id
  };

  persons = persons.concat(person);
  res.json(person);
});

// GET info

app.get('/info', (req, res) => {
  const reqDate = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${reqDate.toString()}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
