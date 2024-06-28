import PropTypes from 'prop-types';

export const ShippingChannelSelector = ({ value, onChange, options }) => {
    return (
      <div>
        <label>Canal de Envío</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Seleccione un canal</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  ShippingChannelSelector.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  