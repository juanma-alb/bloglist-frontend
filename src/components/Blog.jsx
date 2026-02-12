import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)


  const subListStyle = {
    listStyle: 'none',
    padding: '15px 20px',            margin: '10px 0 0 0',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',             color: '#374151',
    fontSize: '0.9rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  }

  const itemStyle = {
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }

  const buttonStyle = {
    marginLeft: '10px',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '0.8rem'
  }

  const show = visible
    ? { ...subListStyle }
    : { ...subListStyle, display: 'none' }

  const label = visible ? 'hide' : 'view'

  const blogStyle = {
    padding: '15px',
    border: '1px solid #e5e7eb',
    marginBottom: '10px',
    borderRadius: '8px',
    backgroundColor: 'white',
    transition: 'all 0.2s ease'
  }

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>
          {blog.title} <span style={{ fontWeight: 'normal', color: '#6b7280', fontSize: '0.9rem' }}>by {blog.author}</span>
        </span>

        <button onClick={() => setVisible(!visible)} style={buttonStyle}>
          {label}
        </button>
      </div>

      <ul style={show}>
        <li style={itemStyle}>
          <span>Url:</span>
          <a href={blog.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
            {blog.url}
          </a>
        </li>
        <li style={itemStyle}>
          <span>Likes: <strong>{blog.likes}</strong></span>
          <button style={buttonStyle}>like</button>
        </li>
        <li style={itemStyle}>
          <span>Author:</span>
          <span style={{ backgroundColor: '#e0e7ff', color: '#3730a3', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
            {blog.user?.name || 'anonymous'}
          </span>
        </li>
      </ul>
    </div>
  )
}

export default Blog