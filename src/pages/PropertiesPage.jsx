import { useMemo, useState } from "react";
import Header from "../components/header.jsx";
import HeroImage from "../components/HeroImage.jsx";
import SearchForm from "../components/SearchForm.jsx";
import CardsGrid from "../components/CardsGrid.jsx";
import FavouriteCard from "../components/FavouriteCard.jsx";
import { properties } from "../data/properties.js";
import "./PropertiesPage.css";

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

  const [favourites, setFavourites] = useState([]);

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

  const toggleFavourite = (property) => {
    setFavourites((current) => {
      const isSaved = current.some((item) => item.id === property.id);
      if (isSaved) {
        return current.filter((item) => item.id !== property.id);
      }
      return [...current, property];
    });
  };

  const removeFavourite = (id) => {
    setFavourites((current) => current.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header />
      <HeroImage />
      <SearchForm filters={filters} setFilters={setFilters} />
      <div className="page-layout">
        <div 
          className="cards-column"
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          }}
          onDrop={(e) => {
            e.preventDefault();
            try {
              const droppedProperty = JSON.parse(e.dataTransfer.getData("application/json"));
              if (droppedProperty && droppedProperty.id) {
                if (favourites.some((fav) => fav.id === droppedProperty.id)) {
                  toggleFavourite(droppedProperty);
                }
              }
            } catch (err) {
              console.log("Drop error:", err);
            }
          }}
        >
          <CardsGrid
            data={filteredProperties}
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
          />
        </div>

        <aside 
          className="favourites-panel"
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
          }}
          onDrop={(e) => {
            e.preventDefault();
            try {
              const droppedProperty = JSON.parse(e.dataTransfer.getData("application/json"));
              if (droppedProperty && droppedProperty.id) {
                if (!favourites.some((fav) => fav.id === droppedProperty.id)) {
                  toggleFavourite(droppedProperty);
                }
              }
            } catch (err) {
              console.log("Drop error:", err);
            }
          }}
        >
          <div className="favourites-header">
            <h3>Favourites</h3>
            <span>{favourites.length}</span>
          </div>

          {favourites.length === 0 ? (
            <p className="favourites-empty">Tap the heart on a home to save it here.</p>
          ) : (
            <ul className="favourites-list">
              {favourites.map((property) => (
                <FavouriteCard
                  key={property.id}
                  property={property}
                  onRemove={removeFavourite}
                />
              ))}
            </ul>
          )}
        </aside>
      </div>
    </>
  );
}