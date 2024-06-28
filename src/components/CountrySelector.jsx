import PropTypes from 'prop-types';

 export const CountrySelector = ({ label, value, onChange, options }) => {
    return (
      <div>
        <label>{label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Seleccione un país</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };



  CountrySelector.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  



