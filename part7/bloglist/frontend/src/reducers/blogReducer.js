import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const reducer = (state = [], action) => {
   switch (action.type) {
   case 'INIT_BLOGS':
      return action.data.sort(byLikes)
   case 'NEW_BLOG':
      return [...state, action.data]
   case 'UPDATE_BLOG':
      return state
         .map((blog) => (blog.id !== action.data.id ? blog : action.data))
         .sort(byLikes)
   case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id)
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
      const toLike = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      const data = await blogService.update(toLike)
      dispatch({
         type: 'UPDATE_BLOG',
         data,
      })
   }
}

export const removeBlog = (id) => {
   return async (dispatch) => {
      await blogService.remove(id)
      dispatch({
         type: 'DELETE_BLOG',
         data: { id },
      })
   }
}

export const addComment = (id, comment) => {
   return async (dispatch) => {
      const data = await blogService.addComment(id, comment)
      dispatch({
         type: 'UPDATE_BLOG',
         data,
      })
   }
}

export default reducer
