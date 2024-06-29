// __tests__/CartonSet.test.js
// import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {CartonSet} from '../components/CartonSet';

describe('CartonSet component', () => {
  const mockCarton = {
    units: 2,
    length: 30,
    width: 20,
    height: 10,
    weight: 5,
  };

  const mockOnChange = jest.fn();

  test('renders CartonSet component correctly', () => {
    const { getByLabelText } = render(
      <CartonSet index={0} carton={mockCarton} onChange={mockOnChange} />
    );

    expect(getByLabelText(/Units:/i)).toBeInTheDocument();
    expect(getByLabelText(/Length \(cm\):/i)).toBeInTheDocument();
    expect(getByLabelText(/Width \(cm\):/i)).toBeInTheDocument();
    expect(getByLabelText(/Height \(cm\):/i)).toBeInTheDocument();
    expect(getByLabelText(/Weight \(kg\):/i)).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    const { getByLabelText } = render(
      <CartonSet index={0} carton={mockCarton} onChange={mockOnChange} />
    );

    const unitsInput = getByLabelText(/Units:/i);
    fireEvent.change(unitsInput, { target: { value: '3' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockCarton,
      units: 3,
    });
  });
});
