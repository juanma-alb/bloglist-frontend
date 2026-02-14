import { useState } from 'react'

const Blog = ({ blog, like, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)


  const blogStyle = {
    padding: '15px 20px',
    border: '1px solid #e5e7eb',
    marginBottom: '12px',
    borderRadius: '8px',
    backgroundColor: 'white',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px'
  }

  const titleStyle = {
    fontWeight: '700',
    fontSize: '1.1rem',
    color: '#111827',
    wordBreak: 'break-word'
  }

  const authorStyle = {
    fontWeight: '400',
    color: '#6b7280',
    fontSize: '0.9rem',
    marginLeft: '6px'
  }

  const actionsStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexShrink: 0
  }

  const detailsContainerStyle = {
    listStyle: 'none',
    padding: '15px',
    margin: '15px 0 0 0',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    color: '#374151',
    fontSize: '0.9rem'
  }

  const itemStyle = {
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }

  const linkStyle = {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500'
  }

  const userBadgeStyle = {
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.025em'
  }

  const buttonStyle = {
    padding: '5px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#374151',
    transition: 'background-color 0.2s'
  }

  const deleteButtonStyle = {
    ...buttonStyle,
    color: '#fff',
    backgroundColor: '#e07777',
    border: '1px solid #95989d',

  }

  const showDetails = visible
    ? { ...detailsContainerStyle }
    : { ...detailsContainerStyle, display: 'none' }

  const label = visible ? 'hide' : 'view'

  const isOwner = user && blog.user && user.username === blog.user.username

  return (
    <div style={blogStyle}>
      <div style={headerStyle}>

        <span style={titleStyle}>
          {blog.title}
          <span style={authorStyle}>by {blog.author}</span>
        </span>

        <div style={actionsStyle}>

          {isOwner && (
            <button
              style={deleteButtonStyle}
              onClick={() => deleteBlog(blog.id)}
            >
              delete
            </button>
          )}

          <button onClick={() => setVisible(!visible)} style={buttonStyle}>
            {label}
          </button>
        </div>

      </div>

      <ul style={showDetails}>
        <li style={itemStyle}>
          <span>Url:</span>
          <a href={blog.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            {blog.url}
          </a>
        </li>

        <li style={itemStyle}>
          <span>Likes: <strong>{blog.likes}</strong></span>
          <button style={buttonStyle} onClick={() => like(blog.id)}>like</button>
        </li>

        <li style={itemStyle}>
          <span>Added by:</span>
          <span style={userBadgeStyle}>
            {blog.user?.username || 'Anonymous'}
          </span>
        </li>
      </ul>
    </div>
  )
}

export default Blog