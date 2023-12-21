import escudo from './../img/escudo.ico'
const Tarjeta = ({ tarjetas, onTarjetaClick }) => {
  return (
    <div >
      {tarjetas.map((tarjeta) => (
        <div key={tarjeta.idTarjeta} className="Contenedor_Tarjeta" onClick={() => onTarjetaClick(tarjeta)}>
          <div className="Contenedor_Compania">
            <img src={escudo} alt="escudo de mexico" className='Img_Logo'/>
            <p className="Compania">{tarjeta.compania}</p>
          </div> 
          <p className="Numero">{tarjeta.numero}</p>
          <p className="Saldo">${tarjeta.saldo}</p>
          <p className="Fecha">{tarjeta.fechaVencimiento}</p>
        </div>
      ))}
    </div>
  );
};

export default Tarjeta

