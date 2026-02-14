import { useState } from 'react'
import Notification from './Notification'

const Login = ({ onLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const containerStyle = {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #e5e7eb',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  }

  const headerStyle = {
    margin: '0 0 20px 0',
    color: '#111827',
    fontSize: '1.5rem',
    fontWeight: '700',
    textAlign: 'center'
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  }

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }

  const labelStyle = {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151'
  }

  const inputStyle = {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  }

  const buttonStyle = {
    marginTop: '10px',
    padding: '12px',
    backgroundColor: '#8c8d8f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.2s'
  }

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleUsername = (event) => setUsername(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  const handleLogin = (event) => {
    event.preventDefault()
    const userObj = { username, password }
    if (!username || !password) {
      notify('All fields are required', 'error')
      return
    }
    onLogin(userObj)

    setPassword('')
  }


  return (

    <div style={containerStyle}>
      <Notification
        message={notification?.message}
        type={notification?.type}
      />
      <h1 style={headerStyle}>Log in to application</h1>


      <form onSubmit={handleLogin} style={formStyle}>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsername}
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Login
        </button>

      </form>
    </div>
  )
}

export default Login