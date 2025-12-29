
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

export default function SearchForm() {
  const [criteria, setCriteria] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    dateAddedAfter: null,
    postcode: ""
  });

  const handleTypeChange = (option) => {
    setCriteria({ ...criteria, type: option?.value || "any" });
  };

  const handleChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search criteria:", criteria);
    // Add your search logic here
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
              />
            </div>

            <div className="form-group">
              <label>Price Range</label>
              <div className="row">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={criteria.minPrice}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={criteria.maxPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Postcode</label>
              <input
                type="text"
                name="postcode"
                placeholder="e.g. BR1"
                value={criteria.postcode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Added After</label>
              <DatePicker
                selected={criteria.dateAddedAfter}
                onChange={(date) =>
                  setCriteria({ ...criteria, dateAddedAfter: date })
                }
                placeholderText="Select Date"
              />
            </div>
          </div>
      </Container>
    </>
  );
}
