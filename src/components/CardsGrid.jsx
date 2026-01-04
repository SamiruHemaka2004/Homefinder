import PropertyCard from "../components/PropertyCard.jsx";
import "./CardsGrid.css";

export default function CardsGrid({ data, favourites, onToggleFavourite }) {
  return (
    <div className="Cards-grid">
      {data.length > 0 ? (
        data.map((item) => (
          <PropertyCard
            key={item.id}
            property={item}
            isFavorite={favourites.some((fav) => fav.id === item.id)}
            onToggleFavourite={() => onToggleFavourite(item)}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", gridColumn: "1 / -1", padding: "40px" }}>
          No properties found matching your criteria. Try adjusting your filters.
        </p>
      )}
    </div>
  );
}