const Login = ({ handleLogin, username, handleUsername, password, handlePassword, loginNotification }) => {

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