import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('test when creating a new blog', () => {
    let container
    const createBlog = jest.fn()

    container = render(<BlogForm createBlog={createBlog} />).container

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const form = container.querySelector('form')

    fireEvent.change(title, { target: { value: 'TestiBlogi' }, })

    fireEvent.change(author, { target: { value: 'Teemu Testaaja' }, })

    fireEvent.change(url, { target: { value: 'https://testi.com' }, })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('TestiBlogi')
    expect(createBlog.mock.calls[0][0].author).toBe('Teemu Testaaja')
    expect(createBlog.mock.calls[0][0].url).toBe('https://testi.com')
  })
})