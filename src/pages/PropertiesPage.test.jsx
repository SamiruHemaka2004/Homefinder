import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PropertiesPage from "./PropertiesPage.jsx";

const renderPage = () => {
    return render(
        <BrowserRouter>
            <PropertiesPage />
        </BrowserRouter>
    );
};

describe("PropertiesPage Filtering", () => {
    it("should filter by property type", () => {
        renderPage();
        const typeSelect = screen.getByRole("combobox");
        expect(typeSelect).toBeInTheDocument();
    });

    it("should filter by minimum price", () => {
        renderPage();
        const minPriceInput = document.querySelector('input[name="minPrice"]');
        fireEvent.change(minPriceInput, { target: { value: "100000" } });
        expect(minPriceInput.value).toBe("100000");
    });

    it("should filter by maximum price", () => {
        renderPage();
        const maxPriceInput = document.querySelector('input[name="maxPrice"]');
        fireEvent.change(maxPriceInput, { target: { value: "500000" } });
        expect(maxPriceInput.value).toBe("500000");
    });

    it("should filter by number of bedrooms", () => {
        renderPage();
        const minBedsInput = document.querySelector('.minBeds');
        fireEvent.change(minBedsInput, { target: { value: "3" } });
        expect(minBedsInput.value).toBe("3");
    });

    it("should filter by postcode", () => {
        renderPage();
        const postcodeInput = screen.getByPlaceholderText("e.g. BR1");
        fireEvent.change(postcodeInput, { target: { value: "BR1" } });
        expect(postcodeInput.value).toBe("BR1");
    });

    it("should reset filters", () => {
        renderPage();
        const minPriceInput = document.querySelector('input[name="minPrice"]');
        const maxPriceInput = document.querySelector('input[name="maxPrice"]');
        const postcodeInput = screen.getByPlaceholderText("e.g. BR1");
        const minBedsInput = document.querySelector('.minBeds');
        
        fireEvent.change(minPriceInput, { target: { value: "100000" } });
        fireEvent.change(maxPriceInput, { target: { value: "500000" } });
        fireEvent.change(postcodeInput, { target: { value: "BR1" } });
        fireEvent.change(minBedsInput, { target: { value: "3" } });
        
        const resetButton = screen.getByText("Reset Filters");
        fireEvent.click(resetButton);
        
        expect(minPriceInput.value).toBe("");
        expect(maxPriceInput.value).toBe("");
        expect(postcodeInput.value).toBe("");
        expect(minBedsInput.value).toBe("");
    });
});