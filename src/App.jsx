import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/loginService'
import Login from './components/Login'

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
      const currentUser = await login.login({ username, password })
      setUser(currentUser)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(currentUser)
      )
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
          <h2>blogs</h2>
          <ul> {/* Abrimos la lista UNA vez */}
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