import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user, handleLike }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = async () => {
    try{
      if(window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
        await blogService.pressDelete(blog.id)
        const blogs = await blogService.getAll()
        const blogSorted = blogs.sort((first,second) => second.likes-first.likes)
        setBlogs(blogSorted)
      }
    } catch (exception){
      console.log(exception)
    }
  }

  return(
    <div id='blog' style={blogStyle}>
      {blog.title} by {blog.author}
      <button id='viewButton' onClick={() => setView(!view)}>View</button>
      {view &&
        <div >
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes}<button id='likeButton' onClick={() => handleLike(blog)}>Like</button></div>
          <div>Posted by {blog.user.username}</div>
          {user.username === blog.user.username && <button id='deleteButton' onClick={handleDelete}>Delete</button>}
        </div>
      }
    </div>
  )
}

export default Blog