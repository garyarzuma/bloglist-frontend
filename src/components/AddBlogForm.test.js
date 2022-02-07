import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm.js>', () => {
  test('Event handler receives correct info when submitted', () => {
    const blog = {
      title: 'Oye Marianos on his way',
      author: 'Lin Manuel',
      url: 'www.encanto.com'
    }
    const mockHandler = jest.fn()
    const component = render(
      <AddBlogForm createBlog={mockHandler} />
    )

    const author = component.container.querySelector('input[name="Author"]')
    fireEvent.change(author, {
      target: { value: blog.author }
    })
    const title = component.container.querySelector('input[name="Title"]')
    fireEvent.change(title, {
      target: { value: blog.title }
    })
    const url = component.container.querySelector('input[name="url"]')
    fireEvent.change(url, {
      target: { value: blog.url }
    })

    const button = component.getByText('create')
    fireEvent.click(button)

    expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
    expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
    expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
  })
})