import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuoteResult } from '../components/QuoteResult';
import { saveQuote } from '../utils/indexedDB';

vi.mock('../utils/indexedDB', () => ({
  saveQuote: vi.fn(),
}));

describe('QuoteResult', () => {
  const quote = {
    shippingChannel: 'air',
    deliveryDays: '5-7 days',
    estimatedDeliveryDate: '2024-07-10',
    origin: 'China',
    destination: 'USA',
    cost: 123456,
  };

  it('renders the quote details correctly', () => {
    render(<QuoteResult quote={quote} />);
    
    expect(screen.getByText('Traditional air freight')).toBeInTheDocument();
    expect(screen.getByText('China to USA')).toBeInTheDocument();
    expect(screen.getByText('5-7 days')).toBeInTheDocument();
    expect(screen.getByText('Estimated delivery:')).toBeInTheDocument();
    expect(screen.getByText('2024-07-10')).toBeInTheDocument(); // Find the exact delivery date text
    expect(screen.getByText((content) => {
        // Check that the cost text contains 'US$' followed by a numeric amount
        const regex = /US\$ (\d+)/;
        const matches = content.match(regex);
        return matches !== null;
      })).toBeInTheDocument();
      
  });

  it('calls saveQuote and shows alert on save button click', async () => {
    render(<QuoteResult quote={quote} />);
    const saveButton = screen.getByText('Save');

    window.alert = vi.fn();

    saveQuote.mockResolvedValueOnce();

    fireEvent.click(saveButton);

    expect(saveQuote).toHaveBeenCalledWith(quote);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Quote saved successfully!');
    });
  });

  it('shows alert on share button click', async () => {
    render(<QuoteResult quote={quote} />);
    const shareButton = screen.getByText('Share');

    const writeTextMock = vi.fn().mockResolvedValueOnce();
    navigator.clipboard = { writeText: writeTextMock };
    window.alert = vi.fn();

    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('The quote link has been copied to your clipboard!');
    });
  });
});