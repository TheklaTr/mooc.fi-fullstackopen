const { ApolloServer, gql } = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
   .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
   })
   .then(() => {
      console.log('connected to MongoDB')
   })
   .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
   })

const typeDefs = gql`
   type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
   }
   type Author {
      name: String!
      born: Int
      bookCount: Int!
      id: ID!
   }
   type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
   }
   type Mutation {
      addBook(
         title: String!
         author: String!
         published: Int!
         genres: [String!]!
      ): Book

      editAuthor(name: String!, setBornTo: Int!): Author
   }
`

const resolvers = {
   Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
         return !args.genre
            ? await Book.find({}).populate('author')
            : await Book.find({ genres: { $in: args.genre } }).populate(
                 'author'
              )
      },

      allAuthors: async () => {
         let authors = await Author.find({})
         return authors.map((author) => ({
            ...author,
            bookCount: books.filter((b) => b.author.name === author.name)
               .length,
         }))
      },
   },
   Mutation: {
      addBook: async (root, args) => {
         // if author is not yet saved to the server
         // if (!authors.find((a) => a.name === args.name)) {
         //    const author = {
         //       name: args.author,
         //       born: null,
         //       id: uuid(),
         //    }
         //    author = authors.concat(author)
         // }

         // const book = { ...args, id: uuid() }
         // books = books.concat(book)
         // return book
         const book = new Book({ ...args })
         return book.save()
      },
      editAuthor: async (root, args) => {
         // const author = authors.find((a) => a.name === args.name)
         // if (!author) {
         //    return null
         // }

         // const updatedAuthor = { ...author, born: args.setBornTo }
         // authors = authors.map((a) =>
         //    a.name === args.name ? updatedAuthor : a
         // )
         // return updatedAuthor
         const author = await Author.findOne({ name: args.name })
         author.born = args.setBornTo
         return author.save()
      },
   },
}

const server = new ApolloServer({
   typeDefs,
   resolvers,
})

server.listen().then(({ url }) => {
   console.log(`Server ready at ${url}`)
})
