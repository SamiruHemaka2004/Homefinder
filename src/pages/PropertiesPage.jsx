import { useState, useMemo } from "react";
import Header from "../components/header.jsx";
import HeroImage from "../components/HeroImage.jsx";
import SearchForm from "../components/SearchForm.jsx";
import CardsGrid from "../components/CardsGrid.jsx";
import { properties } from "../data/properties.js";

export default function PropertiesPage() {
  // State to store filter criteria
  const [filters, setFilters] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    dateAddedAfter: null,
    postcode: ""
  });

  // Filter properties based on criteria
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Type filter
      if (filters.type !== "any" && property.type !== filters.type) {
        return false;
      }

      // Price filters
      if (filters.minPrice && property.price < Number(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && property.price > Number(filters.maxPrice)) {
        return false;
      }

      // Bedroom filters
      if (filters.minBeds && property.beds < Number(filters.minBeds)) {
        return false;
      }
      if (filters.maxBeds && property.beds > Number(filters.maxBeds)) {
        return false;
      }

      // Postcode filter (partial match)
      if (filters.postcode && !property.postcode.toLowerCase().includes(filters.postcode.toLowerCase())) {
        return false;
      }

      // Date filter
      if (filters.dateAddedAfter && property.dateAdded < filters.dateAddedAfter) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <>
      <Header />
      <HeroImage />
      <SearchForm filters={filters} setFilters={setFilters} />
      <CardsGrid data={filteredProperties} />
    </>
  );
}