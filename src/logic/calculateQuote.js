import PropTypes from 'prop-types';

// Tabla de tarifas de envío por kg
const rates = {
  China: {
    Canada: { air: 10, ocean: 5 },
    Germany: { air: 9, ocean: 4 },
    USA: { air: 8, ocean: 3 },
  },
  India: {
    Canada: { air: 20, ocean: 10 },
    Germany: { air: 19, ocean: 9 },
    USA: { air: 18, ocean: 8 },
  },
  Vietnam: {
    Canada: { air: 30, ocean: 15 },
    Germany: { air: 29, ocean: 14 },
    USA: { air: 28, ocean: 13 },
  },
};

// Función para calcular la cotización
export const calculateQuote = (origin, destination, channel, cartons) => {
  const lowerCaseChannel = channel.toLowerCase();
  if (!rates[origin] || !rates[origin][destination] || !rates[origin][destination][lowerCaseChannel]) {
    throw new Error('Tarifa de envío no encontrada para los valores proporcionados.');
  }

  const perKgRate = rates[origin][destination][lowerCaseChannel];

  // Calcular el peso bruto y el peso volumétrico
  let grossWeight = 0;
  let volumetricWeight = 0;
  let oversizeCharge = 0;

  cartons.forEach(carton => {
    const { units, length, width, height, weight } = carton;
    const cartonVolumetricWeight = (length * width * height) / 5000;
    const cartonGrossWeight = weight;

    grossWeight += units * cartonGrossWeight;
    volumetricWeight += units * cartonVolumetricWeight;

    // Calcular el cargo por sobredimensión
    if (origin === 'China' && weight > 30) {
      oversizeCharge += 55;
    } else if (origin === 'India' && length > 120) {
      oversizeCharge += 60;
    } else if (origin === 'Vietnam' && weight > 20 && length > 100) {
      oversizeCharge += 65;
    }
  });

  // Determinar el peso cargable
  const chargeableWeight = Math.max(grossWeight, volumetricWeight);

  // Calcular el costo de envío
  const shippingCost = chargeableWeight * perKgRate + oversizeCharge;

  // Calcular días de entrega
  const deliveryDays = calculateDeliveryDays(channel);

  // Calcular la fecha estimada de entrega
  const estimatedDeliveryDate = calculateEstimatedDeliveryDate(deliveryDays);

  return {
    shippingChannel: channel,
    deliveryDays,
    estimatedDeliveryDate,
    origin,
    destination,
    cost: shippingCost,
  };
};


// Función para calcular los días de entrega
const calculateDeliveryDays = (channel) => {
  const startRange = channel.toLowerCase() === 'air' ? getRandomInt(3, 7) : getRandomInt(25, 30);
  const endRange = startRange + (channel.toLowerCase() === 'air' ? getRandomInt(2, 4) : getRandomInt(5, 10));
  return `${startRange}-${endRange}`;
};

// Función para calcular la fecha estimada de entrega
const calculateEstimatedDeliveryDate = (deliveryDays) => {
  const [start, end] = deliveryDays.split('-').map(Number);
  const currentDate = new Date();
  const startDate = new Date(currentDate.setDate(currentDate.getDate() + start));
  const endDate = new Date(currentDate.setDate(currentDate.getDate() + end));   
  return `${startDate.toDateString()} - ${endDate.toDateString()}`;
};

// Función auxiliar para obtener un número aleatorio entre dos valores
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Definir prop-types para la función calculateQuote
calculateQuote.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  cartons: PropTypes.arrayOf(PropTypes.shape({
    units: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
  })).isRequired,
};

export default calculateQuote;
