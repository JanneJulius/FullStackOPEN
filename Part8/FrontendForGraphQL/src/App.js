import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useSubscription} from '@apollo/client'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Favorites from './components/Favorites'
import { useQuery } from '@apollo/client'
import {USER_DETAILS, ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED} from "./queries";


// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`New book added: ${addedBook.title}`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

      authorResult.refetch();
    },
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const userResult = useQuery(USER_DETAILS, {
    skip: !token,
  });

  const bookResult = useQuery(ALL_BOOKS, {
    skip: !token, 
  });

  const authorResult = useQuery(ALL_AUTHORS, {
    skip: !token, 
  });

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('favorites')}>favorites</button>
      </div>

      <Authors show={page === 'authors'} setError={notify} authorResult={authorResult}/>

      <Books show={page === 'books'} setError={notify} bookResult={bookResult}/>

      <NewBook show={page === 'add'} setError={notify}/>

      <Favorites show={page === 'favorites'} setError={notify} userResult={userResult} bookResult={bookResult}/>

      <button onClick={logout}>logout</button>

    </div>
  )
}

export default App;
