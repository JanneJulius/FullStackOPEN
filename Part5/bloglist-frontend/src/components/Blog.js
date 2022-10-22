import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, deleteBlog, likeBlog, user }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle} className='blog'>
      {!showAll
        ? <div>{blog.title} by {blog.author} <button onClick={() => setShowAll(!showAll)}>view</button></div>
        :
        <div>
          <div>{blog.title} by {blog.author} <button onClick={() => setShowAll(!showAll)}>hide</button></div>
          <div>{blog.url}</div>
          <div>{blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
          <div>{user.name}</div>
          <button onClick={() => deleteBlog(blog)}>remove</button>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  setUpdate: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
}

export default Blog