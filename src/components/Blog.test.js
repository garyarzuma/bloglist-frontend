import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog.js>', () => {
  test('renders content', () => {
    const blog = {
      title: 'Oye Marianos on his way',
      author: 'Lin Manuel',
      url: 'www.encanto.com'
    }

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'Oye Marianos on his way'
    )
    expect(component.container).not.toHaveTextContent(
      'www.encanto.com'
    )
  })

  test('renders content when view is clicked', () => {
    const blog = {
      title: 'Oye Marianos on his way',
      author: 'Lin Manuel',
      url: 'www.encanto.com',
      user: { username: 'garyroolz', name:'gary' }
    }

    const user = {}
    const component = render(
      <Blog blog={blog} user={user}  />
    )

    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'www.encanto.com'
    )
  })

  test('event handler called twice when like is pressed twice', async () => {
    const blog = {
      title: 'Oye Marianos on his way',
      author: 'Lin Manuel',
      url: 'www.encanto.com',
      likes:0,
      user: { username: 'garyroolz', name:'gary' }
    }

    const mockHandler = jest.fn()
    const user = {}
    const component = render(
      <Blog blog={blog} user={user} handleLike={mockHandler}  />
    )

    const button = component.getByText('View')
    fireEvent.click(button)

    const like = component.getByText('Like')
    await fireEvent.click(like)
    await fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})