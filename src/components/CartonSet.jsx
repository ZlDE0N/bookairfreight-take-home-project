import { useState } from 'react';
import PropTypes from 'prop-types';

export const CartonSet = ({ index, carton, onChange }) => {
  const [localCarton, setLocalCarton] = useState(carton);

  const handleInputChange = (field, value) => {
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && /^[0-9]*$/.test(value)) {
      setLocalCarton({ ...localCarton, [field]: intValue });
      onChange({ ...localCarton, [field]: intValue });
    } else if (value === '') {
      setLocalCarton({ ...localCarton, [field]: 0 });
      onChange({ ...localCarton, [field]: 0 });
    }
  };

  return (
    <div>
      <h3 style={{ margin: '0 0 1rem 0' }}>Carton {index + 1}</h3>
      <div className='carton-container'>
        <div className='carton-input'>
          <label htmlFor={`units-${index}`}>Units:</label>
          <input
            id={`units-${index}`}
            type="text"
            pattern="[0-9]*"
            value={localCarton.units === 0 ? '' : localCarton.units}
            onChange={(e) => handleInputChange('units', e.target.value)}
          />
        </div>

        <div className='carton-input'>
          <label htmlFor={`length-${index}`}>Length (cm):</label>
          <input
            id={`length-${index}`}
            type="text"
            pattern="[0-9]*"
            value={localCarton.length === 0 ? '' : localCarton.length}
            onChange={(e) => handleInputChange('length', e.target.value)}
          />
        </div>

        <div className='carton-input'>
          <label htmlFor={`width-${index}`}>Width (cm):</label>
          <input
            id={`width-${index}`}
            type="text"
            pattern="[0-9]*"
            value={localCarton.width === 0 ? '' : localCarton.width}
            onChange={(e) => handleInputChange('width', e.target.value)}
          />
        </div>

        <div className='carton-input'>
          <label htmlFor={`height-${index}`}>Height (cm):</label>
          <input
            id={`height-${index}`}
            type="text"
            pattern="[0-9]*"
            value={localCarton.height === 0 ? '' : localCarton.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
          />
        </div>

        <div className='carton-input'>
          <label htmlFor={`weight-${index}`}>Weight (kg):</label>
          <input
            id={`weight-${index}`}
            type="text"
            pattern="[0-9]*"
            value={localCarton.weight === 0 ? '' : localCarton.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

CartonSet.propTypes = {
  index: PropTypes.number.isRequired,
  carton: PropTypes.shape({
    units: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};