import PropTypes from 'prop-types';

export const CartonSet = ({ carton, onChange }) => {
  const handleInputChange = (field, value) => {
    onChange({ ...carton, [field]: parseFloat(value) || 0 });
  };

  return (
    <div>
      <label>Unidades:</label>
      <input
        type="number"
        value={carton.units}
        onChange={(e) => handleInputChange('units', e.target.value)}
      />

      <label>Largo (cm):</label>
      <input
        type="number"
        value={carton.length}
        onChange={(e) => handleInputChange('length', e.target.value)}
      />

      <label>Ancho (cm):</label>
      <input
        type="number"
        value={carton.width}
        onChange={(e) => handleInputChange('width', e.target.value)}
      />

      <label>Alto (cm):</label>
      <input
        type="number"
        value={carton.height}
        onChange={(e) => handleInputChange('height', e.target.value)}
      />

      <label>Peso (kg):</label>
      <input
        type="number"
        value={carton.weight}
        onChange={(e) => handleInputChange('weight', e.target.value)}
      />
    </div>
  );
};

CartonSet.propTypes = {
  carton: PropTypes.shape({
    units: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
