import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const deleteBlog = jest.fn()
  const likeBlog = jest.fn()

  const blog = {
    id: 'testID',
    title: 'test title',
    url: 'https://test.com',
    likes: 25,
    author: 'test author',
    user: {
      username: 'Testaaja',
      name: 'Teemu Testaaja',
      id: '12345678',
    }
  }
  beforeEach(() => {
    container = render(
      <Blog
        key={blog.id}
        blog={blog}
        deleteBlog={deleteBlog}
        likeBlog={likeBlog}
        user={blog.user}/>
    ).container
  })

  test('renders title and author but not url or likes by default', () => {
    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).not.toHaveTextContent(blog.likes)
    expect(container).not.toHaveTextContent(blog.url)
  })

  test('after clicking the view-button, all details are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).toHaveTextContent(blog.likes)
    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(blog.user.name)
  })

  test('after clicking the hide-button, only title and author are visible again', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const hideButton = screen.getByText('hide')
    await user.click(hideButton)

    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).not.toHaveTextContent(blog.likes)
    expect(container).not.toHaveTextContent(blog.url)
  })

  test('if like is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()
    const detailsButton = screen.getByText('view')
    await user.click(detailsButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})

