import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, setBlogs}) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const newBlog = {...blog, likes:(blog.likes+1)}
    try {
      await blogService.pressLike(newBlog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception){
        console.log(exception)
    }
  }

  return(
    <div style={blogStyle}>
      {blog.title} by {blog.author}   
      <button onClick={()=>setView(!view)}>View</button>
      {view &&
        <div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes}<button onClick={handleLike}>Like</button></div>
          <div>Posted by {blog.user.username}</div>
        </div>  
      }
    </div>  
  )
}

export default Blog