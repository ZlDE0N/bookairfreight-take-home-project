import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartonSet } from '../components/CartonSet';

describe('CartonSet component', () => {
  it('renders with default props', () => {
    const mockOnChange = vi.fn();

    render(
      <CartonSet
        index={0}
        carton={{ units: 0, length: 0, width: 0, height: 0, weight: 0 }}
        onChange={mockOnChange}
      />
    );

    // Test input fields and labels
    expect(screen.getByLabelText(/Units:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Length \(cm\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Width \(cm\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Height \(cm\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight \(kg\):/i)).toBeInTheDocument();
  });

  it('updates state and calls onChange correctly', () => {
    const mockOnChange = vi.fn();

    render(
      <CartonSet
        index={0}
        carton={{ units: 0, length: 0, width: 0, height: 0, weight: 0 }}
        onChange={mockOnChange}
      />
    );

    // Simulate user input
    const unitsInput = screen.getByLabelText(/Units:/i);
    const lengthInput = screen.getByLabelText(/Length \(cm\):/i);
    const widthInput = screen.getByLabelText(/Width \(cm\):/i);
    const heightInput = screen.getByLabelText(/Height \(cm\):/i);
    const weightInput = screen.getByLabelText(/Weight \(kg\):/i);

    fireEvent.change(unitsInput, { target: { value: '10' } });
    fireEvent.change(lengthInput, { target: { value: '20' } });
    fireEvent.change(widthInput, { target: { value: '30' } });
    fireEvent.change(heightInput, { target: { value: '40' } });
    fireEvent.change(weightInput, { target: { value: '50' } });

    // Assert that onChange is called with updated values
    expect(mockOnChange).toHaveBeenCalledTimes(5);
    expect(mockOnChange).toHaveBeenCalledWith({
      units: 10,
      length: 20,
      width: 30,
      height: 40,
      weight: 50,
    });
  });
});