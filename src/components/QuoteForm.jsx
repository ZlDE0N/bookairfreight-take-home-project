import { useState } from "react";
import PropTypes from 'prop-types';
// components
import { CountrySelector } from "./CountrySelector";
import { ShippingChannelSelector } from "./ShippingChannelSelector";
import { CartonSet } from "./CartonSet";
// Shipping cost algorithm
import calculateQuote from "../logic/calculateQuote.JS";

export const QuoteForm = ({ setQuote }) => {

    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [channel, setChannel] = useState('');
    const [cartons, setCartons] = useState([{ units: 0, length: 0, width: 0, height: 0, weight: 0 }]);

    const handleAddCarton = () => {
        setCartons([...cartons, { units: 0, length: 0, width: 0, height: 0, weight: 0 }]);
    };

    const handleRemoveCarton = () => {
        if (cartons.length > 1) {
            setCartons(cartons.slice(0, -1));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const quote = calculateQuote(origin, destination, channel, cartons);
        setQuote(quote);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CountrySelector label="País de Origen" value={origin} onChange={setOrigin} options={['China', 'India', 'Vietnam']} />
            <CountrySelector label="País de Destino" value={destination} onChange={setDestination} options={['USA', 'Canada', 'Germany']} />
            <ShippingChannelSelector value={channel} onChange={setChannel} options={['Aéreo', 'Marítimo']} />

            {cartons.map((carton, index) => (
                <CartonSet
                    key={index}
                    carton={carton}
                    onChange={(updatedCarton) => setCartons(cartons.map((c, i) => (i === index ? updatedCarton : c)))}
                />
            ))}

            {cartons.length > 1 && (
                <button type="button" onClick={handleRemoveCarton}>Eliminar Cartón</button>
            )}
            <button type="button" onClick={handleAddCarton}>Agregar Cartón</button>
            <button type="submit">Enviar</button>
        </form>
    );
};

QuoteForm.propTypes = {
    setQuote: PropTypes.func.isRequired,
};
