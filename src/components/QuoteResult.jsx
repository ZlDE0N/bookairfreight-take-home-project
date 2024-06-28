// import PropTypes from 'prop-types';

// export const QuoteResult = ({ quote }) => {
//   const handleSave = () => {
//     // Lógica para guardar la cotización en almacenamiento local
//   };

//   const handleShare = () => {
//     // Lógica para copiar la URL de la cotización compartida
//   };

//   return (
//     <div>
//       <div>{quote.shippingChannel}</div>
//       <div>{quote.deliveryDays}</div>
//       <div>{quote.estimatedDeliveryDate}</div>
//       <div>{quote.origin} a {quote.destination}</div>
//       <div>{quote.cost.toFixed(2)}</div>
//       <button onClick={handleSave}>Guardar</button>
//       <button onClick={handleShare}>Compartir</button>
//     </div>
//   );
// };

// QuoteResult.propTypes = {
//   quote: PropTypes.shape({
//     shippingChannel: PropTypes.string.isRequired,
//     deliveryDays: PropTypes.string.isRequired,
//     estimatedDeliveryDate: PropTypes.string.isRequired,
//     origin: PropTypes.string.isRequired,
//     destination: PropTypes.string.isRequired,
//     cost: PropTypes.number.isRequired, // Asegúrate de que sea número
//   }).isRequired,
// };
import PropTypes from 'prop-types';
// import './QuoteResult.css'; // Asegúrate de crear este archivo CSS para los estilos
import { saveQuote } from '../utils/indexedDB';

export const QuoteResult = ({ quote }) => {

  const handleSave = () => {
    saveQuote(quote)
      .then(() => {
        alert('Quote saved successfully!');
      })
      .catch(error => {
        console.error('Error saving quote:', error);
        alert('Failed to save quote. Please try again.');
      });
  };


  
  const handleShare = () => {
    // Lógica para copiar la URL de la cotización compartida
  };

  return (
    <div className="quote-container">
      <table className="quote-table">
        <tbody>
          <tr>
            <td className="quote-title">
              {quote.shippingChannel === 'air' ? 'Traditional air freight' : 'Traditional ocean freight'}
            </td>
            <td className="quote-title-right">
              {quote.origin} to {quote.destination}
            </td>
          </tr>
          <tr>
            <td className="quote-left">
              <div className="quote-delivery-days">{quote.deliveryDays}</div>
              <div className="quote-estimated-delivery">Estimated delivery:</div>
              <div className="quote-estimated-date">{quote.estimatedDeliveryDate}</div>
            </td>
            <td className="quote-right">
              <div className="quote-cost">US$ {quote.cost.toFixed(2)}</div>
              <div className="quote-actions">
                <button className="quote-save" onClick={handleSave}>Save</button>
                <button className="quote-share" onClick={handleShare}>Share</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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

export default QuoteResult;

