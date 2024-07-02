import { useState } from 'react';
import PropTypes from 'prop-types';
import { CountrySelector } from './CountrySelector';
import { ShippingChannelSelector } from './ShippingChannelSelector';
import { CartonSet } from './CartonSet';
import calculateQuote from '../logic/calculateQuote.js';

export const QuoteForm = ({ setQuote }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [channel, setChannel] = useState('');
  const [cartons, setCartons] = useState([{ id: Date.now(), units: 0, length: 0, width: 0, height: 0, weight: 0 }]);
  const maxCartons = 5;

  const handleAddCarton = () => {
    if (cartons.length < maxCartons) {
      setCartons([...cartons, { id: Date.now(), units: 0, length: 0, width: 0, height: 0, weight: 0 }]);
    }
  };

  const handleRemoveCarton = (id) => {
    if (cartons.length > 1) {
      setCartons(cartons.filter(carton => carton.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const anyEmpty = cartons.some(carton => (
      carton.units === 0 || carton.length === 0 || carton.width === 0 || carton.height === 0 || carton.weight === 0
    ));

    if (origin && destination && channel && !anyEmpty) {
      const quote = calculateQuote(origin, destination, channel, cartons);
      setQuote(quote);
    } else {
      alert('Please complete all fields before submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='container-selector'>
        <CountrySelector id="origin-country" label="Starting Country" value={origin} onChange={setOrigin} options={['China', 'India', 'Vietnam']} />
        <CountrySelector id="destination-country" defaultOptionText="Select a destination country" label="Destination Country" value={destination} onChange={setDestination} options={['USA', 'Canada', 'Germany']} />
        <ShippingChannelSelector id="shipping-channel" label="Shipping Channel" value={channel} onChange={setChannel} options={['air', 'ocean']} /> 
      </div>

      {cartons.map((carton, index) => (
        <div key={carton.id}>
          <CartonSet
            index={index}
            carton={carton}
            onChange={(updatedCarton) => setCartons(cartons.map((c) => (c.id === carton.id ? updatedCarton : c)))}
          />
          {cartons.length > 1 && (
            <button className='delete-carton-btn' type="button" onClick={() => handleRemoveCarton(carton.id)}>Remove carton</button>
          )}
        </div>
      ))}

      {cartons.length < maxCartons && (
        <button className='add-carton-btn' type="button" onClick={handleAddCarton}>Add carton</button>
      )}

      <div className='btn-container'>
        <button className='submit-btn' type="submit">Submit button</button>
      </div>
    </form>
  );
};

QuoteForm.propTypes = {
  setQuote: PropTypes.func.isRequired,
};
