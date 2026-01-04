import { useMemo, useState, useEffect } from "react";
import HeroImage from "../components/HeroImage.jsx";
import SearchForm from "../components/SearchForm.jsx";
import CardsGrid from "../components/CardsGrid.jsx";
import FavouriteCard from "../components/FavouriteCard.jsx";
import propertiesData from "../data/properties.json";
import "./PropertiesPage.css";

const properties = propertiesData.properties;

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

  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync favourites with localStorage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
    // Dispatch event after localStorage is updated
    window.dispatchEvent(new Event("favouritesChanged"));
  }, [favourites]);

  // Listen for storage changes (from PropertyDetailPage or other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("favourites");
      if (stored) {
        setFavourites(JSON.parse(stored));
      }
    };

    // Listen for custom event (for same-tab updates)
    window.addEventListener("favouritesChanged", handleStorageChange);
    // Listen for storage event (for cross-tab updates)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("favouritesChanged", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
      if (filters.minBeds && property.bedrooms < Number(filters.minBeds)) {
        return false;
      }
      if (filters.maxBeds && property.bedrooms > Number(filters.maxBeds)) {
        return false;
      }

      // Postcode filter (partial match)
      if (filters.postcode && !property.postcode.toLowerCase().includes(filters.postcode.toLowerCase())) {
        return false;
      }

      // Date filter - convert property.added to Date object for comparison
      if (filters.dateAddedAfter && property.added) {
        const monthMap = {
          January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
          July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
        };
        const propertyDate = new Date(property.added.year, monthMap[property.added.month], property.added.day);
        if (propertyDate < filters.dateAddedAfter) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const toggleFavourite = (property) => {
    setFavourites((current) => {
      const isSaved = current.some((item) => item.id === property.id);
      const updated = isSaved
        ? current.filter((item) => item.id !== property.id)
        : [...current, property];
      
      return updated;
    });
  };

  const removeFavourite = (id) => {
    setFavourites((current) => current.filter((item) => item.id !== id));
  };

  return (
    <>
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