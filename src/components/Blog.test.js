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

    component.debug()

    expect(component.container).toHaveTextContent(
      'Oye Marianos on his way'
    )
    expect(component.container).not.toHaveTextContent(
      'www.encanto.com'
    )
  })

  test('renders content', () => {
    const blog = {
      title: 'Oye Marianos on his way',
      author: 'Lin Manuel',
      url: 'www.encanto.com',
      user: { username: 'garyroolz', name:'gary' }
    }
    console.log(blog.user)

    const user = {}
    const component = render(
      <Blog blog={blog} user={user}  />
    )

    const button = component.getByText('View')
    fireEvent.click(button)

    component.debug()
    expect(component.container).toHaveTextContent(
      'www.encanto.com'
    )
  })
})