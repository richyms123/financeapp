// Librearias
import React from "react"
import PropTypes from 'prop-types'
//  Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faSignature} from '@fortawesome/free-solid-svg-icons'
import { faIdBadge } from '@fortawesome/free-solid-svg-icons'
// Componentes
import Login from "./Login.jsx"
// Estilos
import '../styles/Cuenta.css'
// SweetAlert
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Crear_Cuenta = ({setSession}) => {
    const [showLogin, setShowLogin] = React.useState(false)
    const handleShowLogin = () => {
        setShowLogin(true)
    }

    const [formData, setFormData] = React.useState({
        nombre: '',
        apellido: '',
        rfc: ''
    })

    const handleCuenta = async () => {
        try
        {
            const URl='http://localhost:8000/usuarios/'
            if(formData.nombre.trim() === ''){
               await Swal.fire({
                   icon: 'error',
                   title: 'Error',
                   text: 'El nombre no puede estar vacío',
               })
               return
            }
            if(formData.apellido.trim() === ''){
                await Swal.fire({
                     icon: 'error',
                     title: 'Error',
                     text: 'El apellido no puede estar vacío',
                })
                return
            }
            if(formData.rfc.trim() === ''){
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El RFC no puede estar vacío',
                })
                return
            }
            let response = await fetch(URl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if(response.ok){
                let mensaje = await response.json()
                await Swal.fire({
                    icon: 'success',
                    title: mensaje.message,
                    text: '¡Bienvenido ' + formData.nombre + '!',
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
        catch (err){
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal! '+ err,
            })
        }
    }
    return (    
        <>
            {
                showLogin ?
                  <Login setSession={setSession} />
                :
                    <div className="Contenedor_Cuenta">
                        <form className="Form_Cuenta">
                            <h1 className="Title_Cuenta">Crear Cuenta</h1>
                            <div className="Contenedor_Info">
                                <FontAwesomeIcon icon={faUser} className="Icono-Igual"/>
                                <label className="lbl-Igual">Nombre:</label>
                                <input 
                                    type="text" 
                                    className="txt-Igual" 
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                />
                            </div>
                            <div className="Contenedor_Info">
                                <FontAwesomeIcon icon={faSignature} className="Icono-Igual"/>
                                <label className="lbl-Igual">Apellido:</label>
                                <input 
                                    type="text" 
                                    className="txt-Igual" 
                                    value={formData.apellido}
                                    onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                                />
                            </div>
                            <div className="Contenedor_Info">
                                <FontAwesomeIcon icon={faIdBadge} className="Icono-Igual"/>
                                <label className="lbl-Igual">RFC:</label>
                                <input 
                                    type="password" 
                                    className="txt-Igual" 
                                    value={formData.rfc}
                                    onChange={(e) => setFormData({...formData, rfc: e.target.value})}
                                />
                            </div>
                            <div className="Contenedor_btnSesion">
                                <button className="btnSesion" onClick={handleShowLogin}>
                                    Iniciar Sesión
                                </button>
                            </div>
                    
                            <button type="button" className="btnCuenta" onClick={handleCuenta}>
                                Crear Cuenta
                            </button>  
                        </form>
                    </div>
            }
        </>
    )}

Crear_Cuenta.propTypes = {
    setSession: PropTypes.func
}
    

export default Crear_Cuenta