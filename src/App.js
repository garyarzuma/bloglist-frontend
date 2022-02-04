import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [newBlog, setNewBlog] = useState({"title":'',"author":'',"url":''})
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create(newBlog)
      setErrorMessage(`${user.name} added ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) 
      setNewBlog({"title":'',"author":'',"url":''})
    } catch (exception){
      setErrorMessage('Wrong input')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) 
    }
  } 

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setErrorMessage('Wrong Username or Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) 
    }
  } 

  const handleLogout = () => {
    setUser(null)
    setErrorMessage(null)
    setUsername('')
    setPassword('')
    setNewBlog({"title":'',"author":'',"url":''})
    window.localStorage.removeItem('loggedBlogUser')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
      <Notification errorMessage={errorMessage} />
      <LoginForm
        handlelogin={(x)=>handleLogin(x)}
        username={username}
        password={password}
        setPassword={(x)=>setPassword(x)}
        setUsername={(x)=>setUsername(x)}
      />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={()=>handleLogout()}>Logout</button>
      <Notification errorMessage={errorMessage} />
      <Togglable buttonLabel="Create New Blog">
        <AddBlogForm 
          handleAddBlog = {(x) => handleAddBlog(x)}
          newBlog = {newBlog}
          setNewBlog = {(x) => setNewBlog(x)}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App