import React from 'react'

const Login = ({ setSession }) => {

  const [txtRfc, setTxtRfc] = React.useState('')

  const URL = 'http://localhost:8000/login/'

  const handleLogin = async () => {
      let response = await fetch(URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              rfc: txtRfc
          })
      })
      if (response.ok) {
          let data = await response.json()
          setSession(data.usuario)
          console.log(data.message)
      }
}

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={txtRfc}
        onChange={(e) => setTxtRfc(e.target.value)}
      />
      <button
        onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}

export default Login