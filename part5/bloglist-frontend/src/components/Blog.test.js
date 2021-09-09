import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render } from '@testing-library/react'

import Blog from './Blog'
import React from 'react'

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

   test('url and number of likes are shown when the show button clicked', () => {
      const showButton = component.getByText('view')
      fireEvent.click(showButton)

      const div = component.container.querySelector('.blogRender')

      expect(div).toHaveTextContent(blog.url)
      expect(div).toHaveTextContent(blog.likes)
   })

   test('like button is clicked twice', () => {
      const showButton = component.getByText('view')
      fireEvent.click(showButton)

      const likeButton = component.getByText('like')
      fireEvent.click(likeButton)
      fireEvent.click(likeButton)

      expect(mockHandler.mock.calls).toHaveLength(2)
   })
})
