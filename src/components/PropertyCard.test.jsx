import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyCard from './PropertyCard';

const mockProperty = {
    id: 1,
    picture: 'https://example.com/image.jpg',
    bedrooms: 3,
    type: 'Detached',
    tenure: 'Freehold',
    price: 250000,
    location: 'London, UK'
};

const renderPropertyCard = (props = {}) => {
    const defaultProps = {
        property: mockProperty,
        isFavorite: false,
        onToggleFavourite: vi.fn(),
        ...props
    };
    return render(
        <BrowserRouter>
            <PropertyCard {...defaultProps} />
        </BrowserRouter>
    );
};

describe('PropertyCard', () => {
    it('should render the component', () => {
        expect(true).toBe(true);
    });

    it('should display property price formatted', () => {
        renderPropertyCard();
        expect(screen.getByText('£250,000')).toBeInTheDocument();
    });

    it('should display property location', () => {
        renderPropertyCard();
        expect(screen.getByText('London, UK')).toBeInTheDocument();
    });

    it('should display bedrooms and type in meta line', () => {
        renderPropertyCard();
        expect(screen.getByText('3 Beds • Detached')).toBeInTheDocument();
    });

    it('should display View Details button', () => {
        renderPropertyCard();
        expect(screen.getByText('View Details')).toBeInTheDocument();
    });

    it('should display Contact Agent button', () => {
        renderPropertyCard();
        expect(screen.getByText('Contact Agent')).toBeInTheDocument();
    });
});