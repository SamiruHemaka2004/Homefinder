import "./PropertyCard.css";
import heroImage from "../assets/hero-image.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function PropertyCard({ property, isFavorite, onToggleFavourite }) {
  const imageSrc = property.image && property.image.trim() !== "" ? property.image : heroImage;

  return (
    <div className="property-card">
      <div className="property-image">
        <img
          src={imageSrc}
          alt={property.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = heroImage;
          }}
        />
        <div className="title-fav-div">
          <h3 className="property-title">{property.title}</h3>
          <button
            onClick={onToggleFavourite}
            className={`favorite-button ${isFavorite ? "favorited" : ""}`}
            aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
      <div className="property-details">
        <p className="property-price">£{property.price.toLocaleString()}</p>
        <p className="property-beds">{property.beds} Beds • {property.baths} Baths • {property.sqft} sqft</p>
        <p className="property-postcode">Postcode: {property.postcode}</p>
      </div>
      <div className="property-actions">
        <button className="view-details-button">View Details</button>
        <button className="contact-agent-button">Contact Agent</button>
      </div>
    </div>
  );
}
