import { useState } from 'react'

const Login = ({ onLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginNotification, setLoginNotification] = useState('')

  const handleUsername = (event) => setUsername(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  const handleLogin = (event) => {
    event.preventDefault()
    const userObj = { username, password }
    if (!username || !password)
    {
      setLoginNotification('username/ password are required')
      setTimeout(() => setLoginNotification(''), 5000)
      return
    }
    onLogin(userObj)

    setPassword('')

  }

  return (<div>
    <h1>log in to application </h1>

    <h3>{loginNotification}</h3>
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          name ="username"
          type='text'
          placeholder='put here your username'
          value={username}
          onChange={handleUsername}
        />
      </div>

      <div>
        password:
        <input name ="password"
          type='password'
          placeholder='put here your password'
          value={password}
          onChange={handlePassword}
        />
      </div>
      <button>login </button>
    </form>
  </div>)
}

export default Login