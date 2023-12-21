import { useState } from 'react'
import Login from '../pages/Login'
import App from '../pages/App'

const Router = () => {

  const [session, setSession] = useState(() =>{
      let session = localStorage.getItem('session')
      return session ? JSON.parse(session) : null
  })

  const handleSetSession = (userSession) =>{
    setSession(userSession)
    localStorage.setItem('session', JSON.stringify(userSession))
  }

  const handleLogout = () =>{
    setSession(null)
    localStorage.removeItem('session')
  }

  return (
    <>
      {
        session ? 
          <App 
            session={session} 
            //setSession={setSession}
            logout = {handleLogout}
          
          />: 
          <Login setSession={handleSetSession} />
        
      }
    </>
  )
}

export default Router