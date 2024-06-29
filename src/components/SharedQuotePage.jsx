import { Link, useLocation } from 'react-router-dom';
import { QuoteResult } from './QuoteResult';

const SharedQuotePage = () => {
  const location = useLocation();
  const quoteParams = new URLSearchParams(location.search);

// Get the parameters from the URL
  const shippingChannel = quoteParams.get('shippingChannel') || '';
  const origin = quoteParams.get('origin') || '';
  const destination = quoteParams.get('destination') || '';
  const deliveryDays = quoteParams.get('deliveryDays') || '';
  const estimatedDeliveryDate = quoteParams.get('estimatedDeliveryDate') || '';
  const cost = parseFloat(quoteParams.get('cost')) || 0;

  //Building the quote object
  const quote = {
    shippingChannel,
    origin,
    destination,
    deliveryDays,
    estimatedDeliveryDate,
    cost,
  };

  return (
    <div className="shared-quote-page">
      <div className="navigation">
        <Link to="/">Back to Home</Link>
      </div>
      <div className="quote-container">
        <QuoteResult quote={quote} showActions={false}/>
      </div>
    </div>
  );
};

export default SharedQuotePage;
