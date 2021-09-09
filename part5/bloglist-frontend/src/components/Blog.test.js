import '@testing-library/jest-dom/extend-expect'

import Blog from './Blog'
import React from 'react'
import { render } from '@testing-library/react'

describe('<Blog />', () => {
   let component

   const blog = {
      title: 'Title',
      author: 'Author',
      url: 'testing.com',
      likes: 0,
      user: {
         user: 'test-a',
         username: 'test-a',
      },
   }

   const mockHandler = jest.fn()

   beforeEach(() => {
      component = render(
         <Blog blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} />
      )
   })

   test('renders the title and author but neither the url and num of likes by default', () => {
      const div = component.container.querySelector('.blogRender')
      expect(div).toHaveTextContent(blog.title)
      expect(div).toHaveTextContent(blog.author)
      expect(div).not.toHaveTextContent(blog.url)
      expect(div).not.toHaveTextContent(blog.likes)
   })
})
