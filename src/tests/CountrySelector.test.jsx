import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CountrySelector } from '../components/CountrySelector';

describe('CountrySelector component', () => {
  it('renders with default props', async () => {
    await act(async () => {
      render(
        <CountrySelector
          label="Starting Country"
          value=""
          onChange={() => {}}
          options={['China', 'India', 'Vietnam']}
        />
      );
    });

    expect(screen.getByLabelText('Starting Country')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Select a starting country')).toBeInTheDocument();
  });

  it('renders with custom defaultOptionText prop', async () => {
    await act(async () => {
      render(
        <CountrySelector
          label="Destination Country"
          value=""
          onChange={() => {}}
          options={['USA', 'Canada', 'Germany']}
          defaultOptionText="Choose a destination"
        />
      );
    });

    expect(screen.getByLabelText('Destination Country')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Choose a destination')).toBeInTheDocument();
  });

});
