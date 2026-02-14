import { useState } from 'react'
import Notification from './Notification'

export const buttonStyle = {
  marginTop: '10px',
  width: '100%',
  padding: '10px',
  backgroundColor: '#8c8d8f',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.95rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.2s'
}

const Form = ({ onCreate }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState(null)

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  }

  const headerStyle = {
    margin: '0 0 10px 0',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827'
  }

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  }

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#8c8d8f',
    marginLeft: '2px'
  }

  const inputStyle = {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    color: '#8c8d8f',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box'
  }



  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    if (!newTitle || !newAuthor || !newUrl) {
      notify('All fields are required', 'error')
      return
    }
    onCreate(newBlog)

    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
  }

  const handleTitle = (event) => setNewTitle(event.target.value)

  const handleAuthor = (event) => setNewAuthor(event.target.value)

  const handleUrl = (event) => setNewUrl(event.target.value)


  return (
    <div style={formContainerStyle}>
      <h2 style={headerStyle}>Create new blog</h2>

      <Notification
        message={notification?.message}
        type={notification?.type}
      />

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Title</label>
          <input
            type='text'
            value={newTitle}
            onChange={handleTitle}
            placeholder='e.g. React Patterns'
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Author</label>
          <input
            type='text'
            value={newAuthor}
            onChange={handleAuthor}
            placeholder='e.g. Dan Abramov'
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>URL</label>
          <input
            type='text'
            value={newUrl}
            onChange={handleUrl}
            placeholder='https://...'
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Create Blog
        </button>

      </form>
    </div>
  )
}

export default  Form