// Librerias
import PropTypes from 'prop-types'
// Iconos
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faCircleQuestion, faHouse, faMoneyCheck, faMedal, faUser,
    faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
// Estilos
import '../styles/MenuPrincipal.css'

const MenuPrincipal = ({Logout}) => {
    return (
        <nav className='Navbar'>
            <div className='Navbar_Logo'>
                <p>Appfinance</p>
            </div>
            <ul className='Navbar_Menu'>
                <li className='Navbar_Item'>
                    <div className='Item'>
                        <FontAwesomeIcon icon={faHouse} className='Item_Icon' />
                        <a href="#" className='Item_Link'>Inicio</a>
                    </div>
                </li>
                <li className='Navbar_Item'>
                    <div className='Item'>
                        <FontAwesomeIcon icon={faMoneyCheck} className='Item_Icon' />
                        <a href="#" className='Item_Link'>Tarjetas</a>
                    </div>
                </li>
                <li className='Navbar_Item'>
                    <div className='Item'>
                        <FontAwesomeIcon icon={faMedal} className='Item_Icon' />
                        <a href="#" className='Item_Link'>Beneficios</a>
                    </div>
                </li>
                <li className='Navbar_Item'>
                    <div className='Item'>
                        <FontAwesomeIcon icon={faUser} className='Item_Icon' />
                        <a href="#" className='Item_Link'>Perfil</a>
                    </div>
                </li>
                <li className='Navbar_Item'>
                    <div className='Item'>
                        <FontAwesomeIcon icon={faCircleQuestion} className='Item_Icon' />
                        <a href="#" className='Item_Link'>Ayuda</a>
                    </div>
                </li>
                <li className='Navbar_Item' onClick={Logout}>
                    <div className='Item'>
                        <FontAwesomeIcon icon={faRightFromBracket} className='Item_Icon' />
                        <a href="#" className='Item_Link'>Salir</a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

MenuPrincipal.propTypes = {
    Logout: PropTypes.func
}

export default MenuPrincipal