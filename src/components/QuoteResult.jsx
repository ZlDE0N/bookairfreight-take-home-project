import PropTypes from 'prop-types';
import { saveQuote } from '../utils/indexedDB';

export const QuoteResult = ({ quote, showActions }) => {
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
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/shared-quote?shippingChannel=${quote.shippingChannel}&origin=${quote.origin}&destination=${quote.destination}&deliveryDays=${quote.deliveryDays}&estimatedDeliveryDate=${encodeURIComponent(quote.estimatedDeliveryDate)}&cost=${quote.cost}`;
    
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('The quote link has been copied to your clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy the quote link:', err);
        alert('Failed to copy the quote link. Please try again.');
      });
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
              {showActions && (
                <div className="quote-actions">
                  <button className="quote-save" onClick={handleSave}>Save</button>
                  <button className="quote-share" onClick={handleShare}>Share</button>
                </div>
              )}
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
    cost: PropTypes.number.isRequired,
  }).isRequired,
  showActions: PropTypes.bool, // Property to display or not the action buttons
};

QuoteResult.defaultProps = {
  showActions: true, // By default, show action buttons
};

export default QuoteResult;