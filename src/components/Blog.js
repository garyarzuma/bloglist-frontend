import React, {useState} from 'react'

const Blog = ({blog}) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      {blog.title} by {blog.author}   
      <button onClick={()=>setView(!view)}>View</button>
      {view &&
        <div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes}<button>Like</button></div>
          <div>Posted by {blog.user.username}</div>
        </div>  
      }
    </div>  
  )
}

export default Blog