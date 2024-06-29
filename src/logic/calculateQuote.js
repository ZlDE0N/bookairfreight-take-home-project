import PropTypes from 'prop-types';

// Shipping rate table per kg
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

// Function to calculate the quote
export const calculateQuote = (origin, destination, channel, cartons) => {
  const lowerCaseChannel = channel.toLowerCase();
  if (!rates[origin] || !rates[origin][destination] || !rates[origin][destination][lowerCaseChannel]) {
    throw new Error('Shipping rate not found for the values ​​provided.');
  }

  const perKgRate = rates[origin][destination][lowerCaseChannel];

// Calculate gross weight and volumetric weight
  let grossWeight = 0;
  let volumetricWeight = 0;
  let oversizeCharge = 0;

  cartons.forEach(carton => {
    const { units, length, width, height, weight } = carton;
    const cartonVolumetricWeight = (length * width * height) / 5000;
    const cartonGrossWeight = weight;

    grossWeight += units * cartonGrossWeight;
    volumetricWeight += units * cartonVolumetricWeight;

    // Calculate the oversize charge
    if (origin === 'China' && weight > 30) {
      oversizeCharge += 55;
    } else if (origin === 'India' && length > 120) {
      oversizeCharge += 60;
    } else if (origin === 'Vietnam' && weight > 20 && length > 100) {
      oversizeCharge += 65;
    }
  });

// Determine the loadable weight
  const chargeableWeight = Math.max(grossWeight, volumetricWeight);

// Calculate shipping cost
  const shippingCost = chargeableWeight * perKgRate + oversizeCharge;

// Calculate delivery days
  const deliveryDays = calculateDeliveryDays(channel);

// Calculate the estimated delivery date
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


// Function to calculate delivery days
const calculateDeliveryDays = (channel) => {
  const startRange = channel.toLowerCase() === 'air' ? getRandomInt(3, 7) : getRandomInt(25, 30);
  const endRange = startRange + (channel.toLowerCase() === 'air' ? getRandomInt(2, 4) : getRandomInt(5, 10));
  return `${startRange}-${endRange}`;
};

// Function to calculate the estimated delivery date
const calculateEstimatedDeliveryDate = (deliveryDays) => {
  const [start, end] = deliveryDays.split('-').map(Number);
  const currentDate = new Date();
  const startDate = new Date(currentDate.setDate(currentDate.getDate() + start));
  const endDate = new Date(currentDate.setDate(currentDate.getDate() + end));   
  return `${startDate.toDateString()} - ${endDate.toDateString()}`;
};

// Auxiliary function to obtain a random number between two values
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Define prop-types for the calculateQuote function
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
