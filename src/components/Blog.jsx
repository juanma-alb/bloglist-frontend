const Blog = ({ blog }) => {
  const subListStyle = {
    listStyleType: 'circle',
    paddingLeft: '20px'
  }

  return (
    <li>
      <h3>{blog.title}</h3>

      <ul style={subListStyle}>
        <li>
          Author: <strong>{blog.author}</strong>
        </li>
        <li>
          Url: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
        </li>
        <li>
          Liked by {blog.likes} bloggers
        </li>
      </ul>
    </li>
  )
}

export default Blog