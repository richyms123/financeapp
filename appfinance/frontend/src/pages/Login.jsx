// Librearias
import React from 'react'
import PropTypes from 'prop-types'
//  Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge } from '@fortawesome/free-solid-svg-icons'
// Componentes
import Crear_Cuenta from './Crear_Cuenta.jsx'
// Estilos
import './../styles/Login.css'
// SweetAlert
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Login = ({ setSession }) => {

  const [txtRfc, setTxtRfc] = React.useState('')
  const [showLogin, setShowLogin] = React.useState(true)

  const handleShowLogin = () => {
    setShowLogin(false)
  }

  const URL = 'http://localhost:8000/login/'

  const handleLogin = async () => {
      try
      {
        if(txtRfc.trim() === ''){
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El RFC no puede estar vacío',
          })
          return
        }
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
          await Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: '¡' + data.usuario.nombre + '!',
          })
        }
        else{
          let error = await response.json()
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          })
        }
      } 
      catch (err) 
      {
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal! ',
          })
      }
    
      
}
  return (
    <>
      {
        showLogin ?
          <div className='Contenedor_Login'>
            <form className='Form_Login'>
              <h1 className='H1_Login'>Login</h1>
              <div className='Contenedor_IC-LA'>
                <FontAwesomeIcon icon={faIdBadge} className='Icono_Login-Rfc' />
                <label className='Label_Login-Rfc'>RFC:</label>
              </div>
          
              <input
                className='Input_Login-Rfc'
                type="text"
                value={txtRfc}
                onChange={(e) => setTxtRfc(e.target.value)}
              />
              <div className='Contenedor_Input-Cuenta'>
                <button onClick={handleShowLogin} className='Input_CrearCuenta' >Crear Cuenta</button>
              </div>
          
              <button
                type='button'
                className='Button_Login'
                onClick={handleLogin}>
                Iniciar Sesión
              </button>
            </form>
          </div>
        :
          <Crear_Cuenta setSession={setSession} />
      }
    </>
  )}
Login.propTypes = {
  setSession: PropTypes.func
}
export default Login