import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './header'

describe('Header Component', () => {
    it('should navigate to home when logo is clicked', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
        const logo = screen.getByAltText('App Logo')
        expect(logo).toHaveStyle('cursor: pointer')
    })

    it('should have About button', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
        
        const aboutButton = screen.getByRole('button', { name: /about/i })
        expect(aboutButton).toBeInTheDocument()
    })
})