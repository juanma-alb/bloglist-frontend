import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Login from './components/Login'
import  Form, { buttonStyle }  from './components/Form'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notification, setNotification] = useState(null)

  const blogPostRef = useRef()

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  //get blogs-------------------------------------------------------
  useEffect(() => {
    const getAllBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setIsLoading(false)
      setNotification(null)
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
    return (<h1> <Notification
      message="loading..."
      type={notification?.type}
    /> </h1>)

  //login---------------------------------------------------------------------
  const loginUser = async (userObj) => {
    try {
      const currentUser = await loginService.login(userObj)

      setUser(currentUser)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(currentUser)
      )

      blogService.setToken(currentUser.token)

      notify(`Welcome back ${currentUser.name}`)
    } catch (error) {

      if (error.response.data.error.includes('wrong username or password')) {
        notify('Wrong username or password', 'error')

      } else {
        notify('Somethig went worng, try again', 'error')
      }
      console.error (error)
    }
  }

  //logout-------------------------------------
  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    notify('logged out succesfully', 'info')
    setUser(null)

  }

  //create blog---------------------------------------------------------
  const addBlog = async (blogObject) => {

    const blogExist = blogs.some(blog => blog.title === blogObject.title)
    if (blogExist)
    {
      notify('this blog title already exists, try another one', 'error')

      return
    }
    try {

      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notify('blog succesfully added', 'success')
      blogPostRef.current.setVisibility()


    } catch (error) {
      console.error(error)
      notify(`something went wrong. reason: ${error.response.data.error}`, 'error')

    }
  }

  //like a blog--------------------------------------------------------------------
  const likeBlog = async (id) => {
    const blog = blogs.find (blog => blog.id === id)
    try {
      const likedBlog = await blogService.addLike(blog, id)
      setBlogs(blogs.map(blog => blog.id===id ? likedBlog : blog))

    } catch (error) {
      console.error(error)
      notify(`something went wrong. reason: ${error.response.data.error}`, 'error')
    }
  }

  //delete a blog ---------------------------------------------------------------

  const deleteBlog = async (id) => {

    const blogToDelete = blogs.find(blog => blog.id === id)

    console.log(blogToDelete)

    if (!blogToDelete){
      notify('this blog may does not exist anymore', 'error')
      setBlogs(blogs.filter(blog => blog.id!== id))
      return
    }

    const isOwner = user.id === blogToDelete.user.id

    if (!isOwner){
      notify('you cant do this!', 'error')
      return
    }

    try {
      if (window.confirm(`are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.author}?`)){
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(blog => blog.id!== id))
      }
    } catch (error) {
      console.error(error)
      notify(`something went wrong. reason: ${error.response.data.error}`, 'error')

    }
  }


  return (
    <div>
      <Notification
        message={notification?.message}
        type={notification?.type}
      />
      {user===null
        ? (<Login
          onLogin={loginUser}
        />)
        :(<div>
          <div>
            <h3>
              {user.name} logged in <button
                style={{
                  ...buttonStyle,
                  width: 'auto',
                  marginLeft: '5px',
                  padding: '7px',
                  backgroundColor: '#e07777',
                  border: '1px solid #95989d',
                  marginTop: 0,
                }} onClick={logout}> logout
              </button></h3>
          </div>
          <br/>
          <Toggleable buttonLabel='add Note' ref={blogPostRef}><Form onCreate={addBlog}/></Toggleable>
          <br/>

          <h2>blogs</h2>
          <div>
            {sortedBlogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                like={likeBlog}
                user={user}
                deleteBlog={deleteBlog}
              />
            )}

          </div>
        </div>)
      }
    </div>

  )
}

export default App