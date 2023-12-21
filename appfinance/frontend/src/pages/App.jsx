import { useEffect, useState } from 'react'
import Tarjeta from './../components/Tarjeta'
import Modal from './../components/Modal'
import '../styles/Principal.css'
import '../styles/Modal.css'
import '../styles/Tarjeta.css'

let URL = 'http://localhost:8000/tarjetas_usuario/'

const App = ({ setSession, logout, session }) => {

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
      <button onClick={logout} className='app_Buton'>Logout</button>

      <Tarjeta tarjetas={tarjetas}  onTarjetaClick={handleOpenModal}/>
      
      {
        showModal &&
        <Modal
          selectedCard={selectedCard}
          handleCloseModal={handleCloseModal}
        />
      }

    </div>
  )
}
export default App