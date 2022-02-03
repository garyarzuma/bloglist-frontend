import React from 'react'

const AddBlogForm = ({handleAddBlog, newBlog, setNewBlog}) => {

  return(
    <div>
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
            <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({...newBlog, "title" : target.value})}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBlog({...newBlog, "author" : target.value})}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) => setNewBlog({...newBlog, "url" : target.value})}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>      
  )  
}

export default AddBlogForm