import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
    const mockSetFilters = vi.fn();
    const defaultFilters = {
        type: 'any',
        minPrice: '',
        maxPrice: '',
        minBeds: '',
        maxBeds: '',
        dateAddedAfter: null,
        postcode: ''
    };

    it('should render all form fields', () => {
        render(<SearchForm filters={defaultFilters} setFilters={mockSetFilters} />);
        expect(screen.getByText('Property Type')).toBeInTheDocument();
        expect(screen.getByText('Price Range')).toBeInTheDocument();
        expect(screen.getByText('Bedrooms')).toBeInTheDocument();
        expect(screen.getByText('Postcode')).toBeInTheDocument();
        expect(screen.getByText('Added After')).toBeInTheDocument();
    });

    it('should update postcode input', () => {
        render(<SearchForm filters={defaultFilters} setFilters={mockSetFilters} />);
        const postcodeInput = screen.getByPlaceholderText('e.g. BR1');
        fireEvent.change(postcodeInput, { target: { value: 'SW1A' } });
        expect(mockSetFilters).toHaveBeenCalled();
    });

    it('should reset filters on reset button click', () => {
        render(<SearchForm filters={defaultFilters} setFilters={mockSetFilters} />);
        const resetButton = screen.getByRole('button', { name: /reset filters/i });
        fireEvent.click(resetButton);
        expect(mockSetFilters).toHaveBeenCalledWith(defaultFilters);
    });

    it('should update price inputs', () => {
        render(<SearchForm filters={defaultFilters} setFilters={mockSetFilters} />);
        const minPriceInput = screen.getAllByPlaceholderText('Min')[0];
        fireEvent.change(minPriceInput, { target: { value: '100000' } });
        expect(mockSetFilters).toHaveBeenCalled();
    });
});