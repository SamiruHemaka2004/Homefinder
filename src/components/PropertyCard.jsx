import "./PropertyCard.css";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-image.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function PropertyCard({ property, isFavorite, onToggleFavourite }) {
  const navigate = useNavigate();
  const imageSrc = property.image && property.image.trim() !== "" ? property.image : heroImage;
  const bedsLabel = property.beds ? `${property.beds} Beds` : null;
  const typeLabel = property.type ? property.type : null;
  const tenureLabel = property.tenure ? property.tenure : null;
  const metaLine = [bedsLabel, typeLabel || tenureLabel].filter(Boolean).join(" • ");

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  const handleDragStart = (e) => {
    // Only allow drag if not clicking on buttons
    if (e.target.closest("button")) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("application/json", JSON.stringify(property));
  };

  return (
    <div 
      className="property-card"
      draggable="true"
      onDragStart={handleDragStart}
      style={{ cursor: "grab" }}
    >
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
        {metaLine && <p className="property-beds">{metaLine}</p>}
        {property.location && <p className="property-postcode">{property.location}</p>}
      </div>
      <div className="property-actions">
        <button className="view-details-button" onClick={handleViewDetails}>
          View Details
        </button>
        <button className="contact-agent-button">Contact Agent</button>
      </div>
    </div>
  );
}
