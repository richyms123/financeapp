// Librerias
import { useState } from "react"
import PropTypes from 'prop-types'
// SweetAlert
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Modal =({
    selectedTarjeta,
    handleCloseModal

}) => {
    const [login, setLogin] = useState(false)

    const [txtNumTarjeta, setTxtNumTarjeta] = useState('')

    const [destinoDatos, setDestinoDatos] = useState(null)

    const [cantidad, setCantidad] = useState('')

    const handleBuscarTarjeta = async () => {
        try{
            setLogin(true)
            let response = await fetch('http://localhost:8000/tarjeta_numero/' + txtNumTarjeta + '/',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            if(response.ok){
                let data = await response.json()
                console.log(data)
                setDestinoDatos(data)
            }
            else{
                let error = await response.json()
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                })
            }
        }catch(err){
            console.log(err)
        }finally {
            setLogin(false)
        }
    }

    const handleTransferir = async () => {
        try{
            setLogin(true)
            let url = 'http://localhost:8000/transferir/';
            let response = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    origen: selectedTarjeta,
                    destino: destinoDatos.idTarjeta,
                    cantidad: cantidad
                })
            })
            if(response.ok){
                let data = await response.json()
                console.log(data)
                await Swal.fire({
                    icon: 'success',
                    title: 'Transferencia exitosa',
                    text: 'Se transfirieron $' + cantidad + ' a ' + destinoDatos.propietario.nombre + ' ' + destinoDatos.propietario.apellido,
                })
            }
            else{
                let error = await response.json()
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.error,
                })

            }
        }catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal!',
                text: err,
            })

        }finally{
            setLogin(false)
        }
    }

    return(
        <div className='modal-container'>
            <div className='modal'>
                <button className="modal_Salir" onClick={handleCloseModal}>
                    X
                </button>

                <label htmlFor="" className="modal_lblDestino">Destino</label>

                <input
                    value={txtNumTarjeta}
                    onChange={(e) => setTxtNumTarjeta(e.target.value)}
                    type="text"
                    className="modal_InputBuscar" />

                <button
                    disabled={login}
                    className="modal_ButonBuscar"
                    onClick={handleBuscarTarjeta}>
                    {login ? 'Buscando...' : 'Buscar'}
                </button>
                {
                    destinoDatos &&
                    <>
                        <h3>{destinoDatos?.propietario?.nombre} {destinoDatos?.propietario?.apellido}</h3>
                        <label htmlFor="">Cantidad</label>

                        <input
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            type="numero" />

                        <button onClick={handleTransferir}>
                            Transferir
                        </button>
                    </>
                }

            </div>
        </div>

    )
}

Modal.propTypes = {
    selectedTarjeta: PropTypes.number,
    handleCloseModal: PropTypes.func
}

export default Modal