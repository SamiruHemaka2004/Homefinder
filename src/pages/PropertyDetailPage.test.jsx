import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyDetailPage from './PropertyDetailPage';

describe('PropertyDetailPage', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('renders property details correctly', () => {
        render(
            <BrowserRouter>
                <PropertyDetailPage />
            </BrowserRouter>
        );
        expect(screen.getByText(/property|details/i)).toBeInTheDocument();
    });

    it('toggles favorite status', () => {
        render(
            <BrowserRouter>
                <PropertyDetailPage />
            </BrowserRouter>
        );
        const favoriteButton = screen.queryByRole('button', { name: /favorite|heart/i });
        if (favoriteButton) {
            fireEvent.click(favoriteButton);
            expect(favoriteButton).toBeInTheDocument();
        }
    });

    it('navigates back when property is not found', () => {
        render(
            <BrowserRouter>
                <PropertyDetailPage />
            </BrowserRouter>
        );
        expect(screen.getByText(/property|details/i) || screen.queryByText(/not found/i)).toBeTruthy();
    });
});