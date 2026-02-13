import { useState } from 'react'

const Form = ({ onCreate }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [formNotification, setFormNotification] = useState('')

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
    color: '#374151',
    marginLeft: '2px'
  }

  const inputStyle = {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    color: '#1f2937',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box'
  }

  const buttonStyle = {
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

  const errorStyle = {
    color: '#ef4444',
    fontSize: '0.875rem',
    margin: '0 0 10px 0',
    backgroundColor: '#fee2e2',
    padding: '8px',
    borderRadius: '4px',
    textAlign: 'center'
  }


  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    if (!newTitle || !newAuthor || !newUrl) {
      setFormNotification('All fields are required')
      setTimeout(() => setFormNotification(''), 5000)
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

      {formNotification && <div style={errorStyle}>{formNotification}</div>}

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

export default Form