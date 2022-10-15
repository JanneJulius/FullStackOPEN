import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification';



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  //const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({text:'wrong credentials', style: "error"})
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  return (
    <div>

      {user === null 
      ?
      <div>
        <h2>Login</h2>
        <LoginForm username={username} setUsername={setUsername}
        password={password} setPassword={setPassword} handleLogin={handleLogin} />
      </div>
      :
      <div>
        <p>{user.name} logged in</p>
        <h2>blogs</h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
      <Notification message={message} />

    </div>
  )
}

export default App
