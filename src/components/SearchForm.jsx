
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchForm.css";

const typeOptions = [
  { value: "any", label: "Any" },
  { value: "House", label: "House" },
  { value: "Flat", label: "Flat" }
];

export default function SearchForm({ filters, setFilters }) {
  const handleTypeChange = (option) => {
    setFilters({ ...filters, type: option?.value || "any" });
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFilters({ ...filters, dateAddedAfter: date });
  };

  const handleReset = () => {
    setFilters({
      type: "any",
      minPrice: "",
      maxPrice: "",
      minBeds: "",
      maxBeds: "",
      dateAddedAfter: null,
      postcode: ""
    });
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
          <div className="select-card">

            <div className="form-group">
              <label>Property Type</label>
              <Select
                options={typeOptions}
                onChange={handleTypeChange}
                placeholder="Select Type"
                className="type-select"  
              />
            </div>

            <div className="form-group">
              <label>Price Range</label>
              <div className="row">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Bedrooms</label>
              <div className="row">
                <input
                  type="number"
                  className="minBeds"
                  name="minBeds"
                  placeholder="Min"
                  value={filters.minBeds}
                  onChange={handleChange}
                  min="0"
                />
                <input
                  type="number"
                  className="maxBeds"
                  name="maxBeds"
                  placeholder="Max"
                  value={filters.maxBeds}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Postcode</label>
              <input
                type="text"
                name="postcode"
                placeholder="e.g. BR1"
                value={filters.postcode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Added After</label>
              <DatePicker
                selected={filters.dateAddedAfter}
                onChange={handleDateChange}
                placeholderText="Select Date"
              />
            </div>

            <div className="form-group">
              <button type="button" onClick={handleReset} className="reset-button">
                Reset Filters
              </button>
            </div>
          </div>
      </Container>
    </>
  );
}
