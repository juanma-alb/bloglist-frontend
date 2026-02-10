import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Login from './components/Login'
import Form  from './components/Form'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  const [loginNotification, setLoginNotification] = useState('')
  const [notification, setNotification] = useState('')



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

  //login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const currentUser = await loginService.login({ username, password })
      setUser(currentUser)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(currentUser)
      )
      blogService.setToken(currentUser.token)
      setUsername('')
      setPassword('')
      setNotification(`welcome back ${currentUser.name}`)
      setTimeout(() => setNotification(''), 5000)
    } catch (error) {
      if (error.response.data.error.includes('invalid username or password')) {
        setLoginNotification(error.response.data.error)
        setTimeout(() => setLoginNotification(''), 5000)

      } else {
        setLoginNotification('somethig went wrong, try again')
        setTimeout(() => setLoginNotification(''), 5000)
      }
      console.error (error)
    }
  }

  //logout
  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setLoginNotification('logged out succesfully')
    setTimeout(() => setLoginNotification(''), 5000)
    setUser(null)

  }

  //create blog
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


    } catch (error) {
      console.error(error)
      setNotification(`something went wrong. reason: ${error.response.data.error}`)
    }
  }

  //handlers
  const handleUsername = (event) => setUsername(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)



  return (
    <div>
      <div>{notification}</div>
      {user===null
        ? (<Login
          handleLogin={handleLogin}
          username={username}
          handleUsername={handleUsername}
          password={password}
          handlePassword={handlePassword}
          loginNotification={loginNotification}
        />)
        :(<div>
          <div>
            <h3> {user.name} logged in <button onClick={logout}> logout </button></h3>
          </div>
          <br/>
          <Form onCreate={addBlog}/>
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