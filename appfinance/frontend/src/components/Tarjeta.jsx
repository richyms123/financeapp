// Librerias
import PropTypes from 'prop-types'
// Iconos
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLandmark} from '@fortawesome/free-solid-svg-icons'
// Estilos
import Modal from './Modal'


const Tarjeta = ({ 
  tarjetas, onTarjetaClick,
  selectedCard, handleCloseModal,
  showModal

}) => {
  return (
    <div className='Div'>
      {tarjetas.map((tarjeta) => (
        <div key={tarjeta.idTarjeta} className="Contenedor_Tarjeta" onClick={() => onTarjetaClick(tarjeta)}>
          <div className="Contenedor_Compania">
          
          <FontAwesomeIcon icon={faLandmark} className='Img_Logo' />
            <p className="Compania">{tarjeta.compania}</p>
          </div> 
          <p className="Numero">{tarjeta.numero}</p>
          <p className="Saldo">${tarjeta.saldo}</p>
          <div className='Contenedor_Info_FT'>
            <p className="Tipo">{tarjeta.tipo}</p>
            <p className="Fecha">{tarjeta.fechaVencimiento}</p>  
          </div>
          
        </div>
      ))}
      {
        showModal &&
        <Modal
          selectedTarjeta={selectedCard}
          handleCloseModal={handleCloseModal}
        />
      }
    </div>
  );
};

Tarjeta.propTypes = {
  tarjetas: PropTypes.array,
  onTarjetaClick: PropTypes.func,
  selectedCard: PropTypes.number,
  handleCloseModal: PropTypes.func,
  showModal: PropTypes.bool
}

export default Tarjeta

