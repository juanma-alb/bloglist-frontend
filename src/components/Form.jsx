import { useState } from 'react'
const Form = ({ onCreate }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSumbit = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
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
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSumbit}>
        <div>
          <input
            type='text'
            value={newTitle}
            onChange={handleTitle}
            placeholder='put blog title here'
          />
        </div>
        <div>
          <input
            type='text'
            value={newAuthor}
            onChange={handleAuthor}
            placeholder='put blog author here'
          />
        </div>
        <div>
          <input
            type='text'
            value={newUrl}
            onChange={handleUrl}
            placeholder='put blog url here'
          />
        </div>
        <button> create </button>
      </form>
    </div>
  )
}

export default Form