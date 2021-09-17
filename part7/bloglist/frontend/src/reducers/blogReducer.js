import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const reducer = (state = [], action) => {
   switch (action.type) {
   case 'INIT_BLOGS':
      return action.data.sort(byLikes)
   case 'NEW_BLOG':
      return [...state, action.data]
   case 'LIKE':
      return state.map((blog) =>
         blog.id !== action.data.id ? blog : action.data
      )
   default:
      return state
   }
}

export const initializeBlogs = () => {
   return async (dispatch) => {
      const data = await blogService.getAll()
      dispatch({
         type: 'INIT_BLOGS',
         data,
      })
   }
}

export const createBlog = (blog) => {
   return async (dispatch) => {
      const data = await blogService.create(blog)
      dispatch({
         type: 'NEW_BLOG',
         data,
      })
   }
}

export const likeBlog = (blog) => {
   return async (dispatch) => {
      const data = await blogService.update(blog.id)
      dispatch({
         type: 'LIKE',
         data,
      })
   }
}

export default reducer
