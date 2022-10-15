const ld = require('lodash')

const dummy = blogs =>  1

const totalLikes = blogs => blogs.reduce((total, blog) => total += blog.likes, 0)

const favoriteBlog = blogs => {
  if (blogs.length === 0) return {}

  const fav = blogs.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current
  }) 

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

const byAuthor = blog => blog.author

const mostBlogs = blogs => {

  if (blogs.length === 0) return {}

  const grouped = ld.groupBy(blogs, byAuthor)
  const authors = Object.keys(grouped)
  const blogArrays = Object.values(grouped)
  const blogLengths = blogArrays.map(arr => arr.length)
  const max = Math.max(...blogLengths)
  const index = blogLengths.indexOf(max)

  return {
    author: authors[index],
    blogs: max
  }
}

const mostLikes = blogs => {

  if (blogs.length === 0) return {}

  const grouped = ld.groupBy(blogs, byAuthor)
  const authors = Object.keys(grouped)
  const blogArrays = Object.values(grouped)
  const summedLikes = blogArrays.map(arr => totalLikes(arr))
  const max = Math.max(...summedLikes)
  const index = summedLikes.indexOf(max)

  return {
    author: authors[index],
    likes: max
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}