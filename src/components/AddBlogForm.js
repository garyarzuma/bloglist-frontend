import React, { useState } from 'react'

const AddBlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ 'title':'','author':'','url':'' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ 'title':'','author':'','url':'' })
  }

  return(
    <div>
      <h2>Create New Blog Post</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, 'title' : target.value })}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBlog({ ...newBlog, 'author' : target.value })}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) => setNewBlog({ ...newBlog, 'url' : target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AddBlogForm