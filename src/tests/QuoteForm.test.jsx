import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuoteForm } from '../components/QuoteForm';

describe('QuoteForm component', () => {
  it('renders the form with initial state', () => {
    const mockSetQuote = vi.fn();

    render(<QuoteForm setQuote={mockSetQuote} />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/Starting Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Shipping Channel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Units:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Length \(cm\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Width \(cm\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Height \(cm\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight \(kg\):/i)).toBeInTheDocument();
  });

  it('adds and removes cartons correctly', () => {
    const mockSetQuote = vi.fn();

    render(<QuoteForm setQuote={mockSetQuote} />);

    // Initially, there should be one carton
    expect(screen.getAllByLabelText(/Units:/i)).toHaveLength(1);

    // Add a new carton
    fireEvent.click(screen.getByText(/Add carton/i));
    expect(screen.getAllByLabelText(/Units:/i)).toHaveLength(2);

    // Remove a carton
    fireEvent.click(screen.getAllByText(/Remove carton/i)[0]);
    expect(screen.getAllByLabelText(/Units:/i)).toHaveLength(1);
  });

  it('handles form submission correctly', () => {
    const mockSetQuote = vi.fn();

    render(<QuoteForm setQuote={mockSetQuote} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Starting Country/i), { target: { value: 'China' } });
    fireEvent.change(screen.getByLabelText(/Destination Country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/Shipping Channel/i), { target: { value: 'air' } });
    fireEvent.change(screen.getByLabelText(/Units:/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Length \(cm\):/i), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText(/Width \(cm\):/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Height \(cm\):/i), { target: { value: '40' } });
    fireEvent.change(screen.getByLabelText(/Weight \(kg\):/i), { target: { value: '50' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Submit button/i));

    // Assert that setQuote is called
    expect(mockSetQuote).toHaveBeenCalled();
  });
});
