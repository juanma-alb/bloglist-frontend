import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Login from './components/Login'
import Form  from './components/Form'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notification, setNotification] = useState('')

  const blogPostRef = useRef()

  //get blogs-------------------------------------------------------
  useEffect(() => {
    const getAllBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setIsLoading(false)
    }
    getAllBlogs()

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (isLoading)
    return (<h1> loading... </h1>)

  //login---------------------------------------------------------------------
  const loginUser = async (userObj) => {
    try {
      const currentUser = await loginService.login(userObj)

      setUser(currentUser)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(currentUser)
      )

      blogService.setToken(currentUser.token)

      setNotification(`welcome back ${currentUser.name}`)
      setTimeout(() => setNotification(''), 5000)

    } catch (error) {

      if (error.response.data.error.includes('wrong username or password')) {
        setNotification(error.response.data.error)
        setTimeout(() => setNotification(''), 5000)

      } else {
        setNotification('somethig went wrong, try again')
        setTimeout(() => setNotification(''), 5000)
      }
      console.error (error)
    }
  }

  //logout-------------------------------------
  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setNotification('logged out succesfully')
    setTimeout(() => setNotification(''), 5000)
    setUser(null)

  }

  //create blog---------------------------------------------------------
  const addBlog = async (blogObject) => {

    const blogExist = blogs.some(blog => blog.title === blogObject.title)
    if (blogExist)
    {
      setNotification('this blog title already exists, try another one')

      setTimeout(() => setNotification(''), 5000)
      return
    }
    try {

      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification('blog succesfully added')
      setTimeout(() => setNotification(''), 5000)
      blogPostRef.current.setVisibility()


    } catch (error) {
      console.error(error)
      setNotification(`something went wrong. reason: ${error.response.data.error}`)
    }
  }

  return (
    <div>
      <div>{notification}</div>
      {user===null
        ? (<Login
          onLogin={loginUser}
        />)
        :(<div>
          <div>
            <h3> {user.name} logged in <button onClick={logout}> logout </button></h3>
          </div>
          <br/>
          <Toggleable buttonLabel='add Note' buttonLabel2="cancel" ref={blogPostRef}><Form onCreate={addBlog}/></Toggleable>
          <br/>

          <h2>blogs</h2>
          <ul>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </ul>
        </div>)
      }
    </div>

  )
}

export default App