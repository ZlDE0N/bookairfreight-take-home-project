import PropTypes from 'prop-types';

export const QuoteResult = ({ quote }) => {
  const handleSave = () => {
    // Lógica para guardar la cotización en almacenamiento local
  };

  const handleShare = () => {
    // Lógica para copiar la URL de la cotización compartida
  };

  return (
    <div>
      <div>{quote.shippingChannel}</div>
      <div>{quote.deliveryDays}</div>
      <div>{quote.estimatedDeliveryDate}</div>
      <div>{quote.origin} a {quote.destination}</div>
      <div>{quote.cost.toFixed(2)}</div>
      <button onClick={handleSave}>Guardar</button>
      <button onClick={handleShare}>Compartir</button>
    </div>
  );
};

QuoteResult.propTypes = {
  quote: PropTypes.shape({
    shippingChannel: PropTypes.string.isRequired,
    deliveryDays: PropTypes.string.isRequired,
    estimatedDeliveryDate: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired, // Asegúrate de que sea número
  }).isRequired,
};
