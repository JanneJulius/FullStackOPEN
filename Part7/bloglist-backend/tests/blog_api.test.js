const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/users')


let token
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  const user = {
    username: 'test',
    name: 'test user',
    password: 'password1234'
  }

  await api.post('/api/users').send(user)

  const response = await api.post('/api/login').send(user)

  token = `bearer ${response.body.token}`
})

describe('api tests', () => {

  describe('initial tests', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('blog has propery id and not _id', async () => {
      const singleBlog = await helper.blogsInDB()
  
      expect(singleBlog[0].id).toBeDefined()
      expect(singleBlog[0]._id).toBe(undefined)
    })

    test('all blogs are returned', async () => {
      const response = await api
        .get('/api/blogs')
  
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
      const response = await api
        .get('/api/blogs')
  
      const titles = response.body.map(r => r.title)
      expect(titles).toContain('React patterns')
    })
  })
  
  describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Test to add a valid blog to DB',
        author: 'Test Tester',
        url: 'http:moi.fi',
        likes: 25
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDB()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(
        'Test to add a valid blog to DB'
      )
    })

    test('blog without required info is not added', async () => {
      // title and url are missing
      const newBlog = {
        author: 'Test Tester',
        likes: 25
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(400)
  
      const blogsAtEnd = await helper.blogsInDB()
  
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('new blogpost without likes is set to 0', async () => {
      // likes are missing
      const newBlog = {
        title: 'Test for new blog without likes',
        author: 'Test Tester',
        url: 'http:moi.fi'
      }
  
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
  
      // Check that likes are set to 0
      expect(response.body.likes).toBeDefined()
      expect(response.body.likes).toBe(0)
    })
  })

  describe('deletion of a blog', () => {

    const testBody = {
      title: 'Test update',
      author: 'Tester',
      url: 'https://reactpatterns.com/test',
      likes: 20
    }

    test('succeeds with status code 204 if id is valid and user have rights to delete', async () => {
      const blogsAtStart = await helper.blogsInDB()

      const resp = await api
        .post('/api/blogs')
        .send(testBody)
        .set('Authorization', token)

      await api
        .delete(`/api/blogs/${resp.body.id}`)
        .set('Authorization', token)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDB()

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

      const titles = blogsAtEnd.map(b => b.title)

      expect(titles).not.toContain('Test update')
    })

    test('fails with statuscode 401 if user dont have rights to delete', async () => {

      let token2
      const user2 = {
        username: 'test2',
        name: 'test user2',
        password: 'password12345677'
      }
    
      await api.post('/api/users').send(user2)
    
      const response = await api.post('/api/login').send(user2)
    
      token2 = `bearer ${response.body.token}`

      // Token2 creates this blog so token cant delete it
      const resp = await api
        .post('/api/blogs')
        .send(testBody)
        .set('Authorization', token2)

      const blogsAtStart = await helper.blogsInDB()

      await api
        .delete(`/api/blogs/${resp.body.id}`)
        .set('Authorization', token)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDB()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', token)
        .expect(400)
    })
  })

  describe('updating a blog', () => {

    const testBody = {
      title: 'Test update',
      author: 'Tester',
      url: 'https://reactpatterns.com/test',
      likes: 20
    }

    test('succeeds with status code 200 if id is valid', async () => {

      const blogsAtStart = await helper.blogsInDB()

      const blogToUpdate = blogsAtStart[0]

      const result = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(testBody)
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      expect(result.body.title).toBe(testBody.title)
      expect(result.body.author).toBe(testBody.author)
      expect(result.body.url).toBe(testBody.url)
      expect(result.body.likes).toBe(testBody.likes)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send(testBody)
        .set('Authorization', token)
        .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .put(`/api/blogs/${invalidId}`)
        .send(testBody)
        .set('Authorization', token)
        .expect(400)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})