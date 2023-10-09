const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const User = require('./models/user')
const Book = require('./models/book')
const jwt = require('jsonwebtoken')


const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount:  () =>  Book.collection.countDocuments(),
    authorCount:  () =>  Author.collection.countDocuments(),

    allBooks: async (_root, args) => {
      let author = null;
      if (args.author) author = await Author.findOne({name: args.author});
      if (args.author && !author) return [];

      let filter = {};
      if (args.author) filter = {author: author.id};
      if (args.genre) filter = {genres: {$elemMatch: {$eq: args.genre}}};
      if (args.author && args.genre)
        filter = {
          author: author.id,
          genres: {$elemMatch: {$eq: args.genre}},
        };

      return await Book.find(filter).populate("author");
    },

    allAuthors: async () => await Author.find({}),

    me: (_root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    id: (author) => author._id,
  },

  Book: {
    id: (book) => book._id, 
  },

  Mutation: {
    addBook: async (_root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let author = await Author.findOne({ name: args.author });

      if(!author){

        // Create a new author with no born year.
        author = new Author({
          name: args.author,
          born: null,
          bookCount: 0,
        })

        try {
          await author.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const foundAuthor = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: foundAuthor })

      try {
        await book.save()

        // Increment the author's bookCount
        author.bookCount += 1;
        await author.save();

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

      } catch (error) {
        throw new GraphQLError('Saving book failed in addBook mutation', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
      return book
    },

    editAuthor: async (_root, args, context) => {

      const currentUser = context.currentUser
      
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      try{
        const author = await Author.findOne({ name: args.name });
        if (!author) {
          return null
        }
        author.born = args.born;
        await author.save();

        const bookCount = await Book.countDocuments({ author: author._id });
        author.bookCount = bookCount;


        return author;

      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
    },

    createUser: async (_root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },

    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers