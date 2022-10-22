import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const ref = useRef()

  // Fetch all blogs at the beginning
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // Check if there is user credentials saved on local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Login
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
      setMessage({ text:`Successfully logged in with user ${user.username}`, style: 'success' })
    } catch (exception) {
      setMessage({ text:'Wrong credentials!', style: 'error' })
    }
    setTimeout(() => { setMessage(null) }, 4000)
  }

  // Logout
  const handleLogout = async event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setMessage({ text:`Successfully logged out from user ${user.username}`, style: 'success' })
    } catch (exception) {
      setMessage({ text:'Error when logging out', style: 'error' })
    }
    setTimeout(() => { setMessage(null) }, 4000)
  }

  // Create new blog
  const createBlog = async body => {
    try {
      ref.current.toggleVisibility()
      const resp = await blogService.create(body)
      setBlogs(blogs.concat(resp))
      setMessage({ text:`${user.username} created a blog called ${resp.title}`, style: 'success' })
    } catch (exception) {
      setMessage({ text:'Error when creating a new blog', style: 'error' })
    }
    setTimeout(() => { setMessage(null) }, 4000)
  }

  // Delete blog from the list
  const deleteBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title}?`)){
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id ))
        setMessage({ text:`Deleted blog ${blog.title}`, style: 'success' })
      }catch (exception) {
        setMessage({ text:'Error when deleting a blog', style: 'error' })
      }
      setTimeout(() => { setMessage(null) }, 4000)
    }
  }

  // Liking a blog
  const likeBlog = async (blog) => {
    const body = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id,
      likes:  blog.likes + 1
    }
    try {
      const res = await blogService.update(body)
      setBlogs(blogs.map(b => b.id !== res.id ? b : res))
      setMessage({ text:`Liked blog ${res.title}`, style: 'success' })
    }catch (exception) {
      setMessage({ text:'Error when liking a blog', style: 'error' })
    }
    setTimeout(() => { setMessage(null) }, 4000)
  }

  // Display user info
  const userInfo = () => (
    <div>
      {user.name} logged in <button onClick={handleLogout}>Logout</button>
    </div>
  )

  // Display the create a new blog form
  const blogForm = () => (
    <Togglable buttonLabel="Create a Blog" ref={ref}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  // Render login page when there are no users logged in.
  if (user === null) {
    return(
      <>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
        <Notification message={message} />
      </>
    )
  }

  // User is logged in. Render main view.
  return (
    <>
      <h2>Blogs</h2>
      {userInfo()}
      {blogForm()}
      <div className='bloglist'>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} likeBlog={likeBlog} user={user}/>)}
      </div>
      <Notification message={message} />
    </>
  )
}

export default App
