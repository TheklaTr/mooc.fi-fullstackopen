const {
   ApolloServer,
   gql,
   UserInputError,
   AuthenticationError,
} = require('apollo-server')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

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
   type User {
      username: String!
      favoriteGenre: String!
      id: ID!
   }
   type Token {
      value: String!
   }
   type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
   }
   type Mutation {
      addBook(
         title: String!
         author: String!
         published: Int!
         genres: [String!]!
      ): Book

      editAuthor(name: String!, setBornTo: Int!): Author

      createUser(username: String!, favoriteGenre: String!): User
      login(username: String!, password: String!): Token
   }

   type Subscription {
      bookAdded: Book!
   }
`

const resolvers = {
   Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
         const books = await Book.find({}).populate('author')

         return args.genre && args.author
            ? books.filter(
                 (b) =>
                    b.genres.includes(args.genre) &&
                    b.author.name === args.author
              )
            : args.author
            ? books.filter((b) => b.author.name === args.author)
            : args.genre
            ? books.filter((b) => b.genres.includes(args.genre))
            : books
      },

      allAuthors: async () => {
         let authors = await Author.find({})
         const books = await Book.find({}).populate('author')
         return authors.map((author) => ({
            id: author._id,
            name: author.name,
            born: author.born,
            bookCount: books.filter((b) => b.author.name === author.name)
               .length,
         }))
      },

      me: (root, args, context) => {
         return context.currentUser
      },
   },
   Mutation: {
      addBook: async (root, args, context) => {
         const currentUser = context.currentUser

         if (!currentUser) {
            throw new AuthenticationError('not authenticated')
         }

         try {
            let author = await Author.findOne({ name: args.author })

            // if author is not yet saved to the server
            if (!author) {
               author = new Author({
                  name: args.author,
                  born: null,
               })
               await author.save()
            }

            const book = new Book({ ...args, author })

            author.bookCount++
            await author.save()

            await book.save()

            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book
         } catch (error) {
            throw new UserInputError(error.message, {
               invalidArgs: args,
            })
         }
      },

      editAuthor: async (root, args, { currentUser }) => {
         if (!currentUser) {
            throw new AuthenticationError('not authenticated')
         }

         const author = await Author.findOne({ name: args.name })
         author.born = args.setBornTo

         try {
            await author.save()
         } catch (error) {
            throw new UserInputError(error.message, {
               invalidArgs: args,
            })
         }
         return author
      },

      createUser: (root, args) => {
         const user = new User({
            username: args.username,
            favoriteGenre: args.favoriteGenre,
         })

         return user.save().catch((error) => {
            throw new UserInputError(error.message, {
               invalidArgs: args,
            })
         })
      },

      login: async (root, args) => {
         const user = await User.findOne({ username: args.username })

         if (!user || args.password !== 'secret') {
            throw new UserInputError('wrong credentials')
         }

         const userForToken = {
            username: user.username,
            id: user._id,
         }

         return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
   },

   Subscription: {
      bookAdded: {
         subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
      },
   },
}

const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null

      if (auth && auth.toLowerCase().startsWith('bearer ')) {
         const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
         const currentUser = await User.findById(decodedToken.id)

         // console.log({ currentUser })
         return { currentUser }
      }
   },
})

server.listen().then(({ url, subscriptionsUrl }) => {
   console.log(`Server ready at ${url}`)
   console.log(`Subscription ready at ${subscriptionsUrl}`)
})
