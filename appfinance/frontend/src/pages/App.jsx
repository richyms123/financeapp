// Librearias
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// Componentes
import MenuPrincipal from '../components/MenuPrincipal.jsx'
import Tarjeta from './../components/Tarjeta.jsx'
// Estilos
import '../styles/Principal.css'
import '../styles/Modal.css'
import '../styles/Tarjeta.css'

let URL = 'http://localhost:8000/tarjetas_usuario/'

const App = ({ logout, session }) => {

  const [tarjetas, setTarjetas] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const handleOpenModal = (card) => {
    setShowModal(true)
    setSelectedCard(card.idTarjeta)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  
  const getTarjetas = async () => {
    let response = await fetch(URL + session.idUsuario + '/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      let dataa = await response.json()
      console.log(dataa)
      setTarjetas(dataa)
    }
  }

  useEffect(() => {
    getTarjetas()
  }, [])

  return (
    <div className='Contenedor_Principal'>
      <MenuPrincipal Logout={logout} />
      <Tarjeta 
        tarjetas={tarjetas}  
        onTarjetaClick={handleOpenModal}
        selectedCard={selectedCard}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
      />

    </div>
  )
}

App.propTypes = {
  setSession: PropTypes.func,
  logout: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
}
export default App