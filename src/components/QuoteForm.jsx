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
  const [cartons, setCartons] = useState([{ units: 0, length: 0, width: 0, height: 0, weight: 0 }]);
  const maxCartons = 5; // Maximum number of cardboard sets allowed

  const handleAddCarton = () => {
    if (cartons.length < maxCartons) {
      setCartons([...cartons, { units: 0, length: 0, width: 0, height: 0, weight: 0 }]);
    }
  };

  const handleRemoveCarton = (indexToRemove) => {
    if (cartons.length > 1) {
      setCartons(cartons.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all fields are not empty
    const anyEmpty = cartons.some(carton => (
      carton.units === 0 || carton.length === 0 || carton.width === 0 || carton.height === 0 || carton.weight === 0
    ));

    if (origin && destination && channel && !anyEmpty) {
      // Calculate the quote
      const quote = calculateQuote(origin, destination, channel, cartons);
      setQuote(quote); // Update the quote in the Home status
    } else {
      alert('Por favor completa todos los campos antes de enviar el formulario.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='container-selector'>
        <CountrySelector defaultOptionText="Select a starting country" label="Starting Country" value={origin} onChange={setOrigin} options={['China', 'India', 'Vietnam']} />
        <CountrySelector defaultOptionText="Select a destination country" label="Destination Country" value={destination} onChange={setDestination} options={['USA', 'Canada', 'Germany']} />
        <ShippingChannelSelector value={channel} onChange={setChannel} options={['air', 'ocean']} /> {/* Asegúrate de que las opciones coincidan con lo esperado por calculateQuote */}
      </div>

      {cartons.map((carton, index) => (
        <div key={index}>
          <CartonSet
            index={index}
            carton={carton}
            onChange={(updatedCarton) => setCartons(cartons.map((c, i) => (i === index ? updatedCarton : c)))}
          />
          {cartons.length > 1 && (
            <button className='delete-carton-btn' type="button" onClick={() => handleRemoveCarton(index)}>Remove carton</button>
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
