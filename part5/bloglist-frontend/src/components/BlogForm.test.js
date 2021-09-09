import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render } from '@testing-library/react'

import BlogForm from './BlogForm'
import React from 'react'

describe('<BlogForm />', () => {
   test('the form calls the event handler it received as props with the right details', () => {
      const addBlog = jest.fn()

      const component = render(<BlogForm createBlog={addBlog} />)

      const form = component.container.querySelector('form')
      const title = component.container.querySelector('#title')
      const author = component.container.querySelector('#author')
      const url = component.container.querySelector('#url')

      fireEvent.change(title, {
         target: { value: 'title-a' },
      })

      fireEvent.change(author, {
         target: { value: 'author-a' },
      })

      fireEvent.change(url, {
         target: { value: 'url-a.com' },
      })
      fireEvent.submit(form)

      expect(addBlog.mock.calls).toHaveLength(1)

      expect(addBlog.mock.calls[0][0].title).toBe('title-a')
      expect(addBlog.mock.calls[0][0].author).toBe('author-a')
      expect(addBlog.mock.calls[0][0].url).toBe('url-a.com')
   })
})
