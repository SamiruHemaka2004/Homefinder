import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import propertiesData from "../data/properties.json";
import Header from "../components/header.jsx";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./PropertyDetailPage.css";

const properties = propertiesData.properties;

export default function PropertyDetailPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === propertyId);
  const [mainImage, setMainImage] = useState(property?.images[0] || "");
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favourites") || "[]");
    const isFav = storedFavorites.some((fav) => fav.id === propertyId);
    setIsFavorite(isFav);
  }, [propertyId]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favourites") || "[]");
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = storedFavorites.filter((fav) => fav.id !== propertyId);
    } else {
      updatedFavorites = [...storedFavorites, property];
    }

    localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("favouritesChanged"));
  };

  if (!property) {
    return (
      <>
        <Header />
        <div className="detail-container">
          <p className="error-message">Property not found</p>
          <button className="back-button" onClick={() => navigate("/")}>
            Back to Properties
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="detail-container">
        {/* MAIN IMAGE SECTION */}
        <div className="image-section">
          <div className="main-image-container">
            <img src={mainImage} alt="Property" className="main-image" />
          </div>

          {/* THUMBNAIL GALLERY - 6 IMAGES */}
          <div className="thumbnails">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${mainImage === image ? "active" : ""}`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        {/* SHORT DESCRIPTION */}
        <div className="short-info">
          <div className="title-fav-container">
            <h1>{property.location}</h1>
            <button
              onClick={toggleFavorite}
              className={`favorite-button ${isFavorite ? "favorited" : ""}`}
              aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <p className="property-type">{property.type}</p>
          <p className="property-price">£{property.price.toLocaleString()}</p>
        </div>

        {/* TABS SECTION */}
        <div className="tabs-section">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`tab-button ${activeTab === "floorplan" ? "active" : ""}`}
              onClick={() => setActiveTab("floorplan")}
            >
              Floor Plan
            </button>
            <button
              className={`tab-button ${activeTab === "location" ? "active" : ""}`}
              onClick={() => setActiveTab("location")}
            >
              Location
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="tab-content">
            {activeTab === "description" && (
              <div className="tab-pane">
                <h2>Property Description</h2>
                <p dangerouslySetInnerHTML={{ __html: property.description }}></p>
                <div className="property-specs">
                  <div className="spec-item">
                    <strong>Type:</strong> {property.type}
                  </div>
                  <div className="spec-item">
                    <strong>Bedrooms:</strong> {property.bedrooms}
                  </div>
                  <div className="spec-item">
                    <strong>Tenure:</strong> {property.tenure}
                  </div>
                  <div className="spec-item">
                    <strong>Postcode:</strong> {property.postcode}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "floorplan" && (
              <div className="tab-pane">
                <h2>Floor Plan</h2>
                <div className="floorplan-container">
                  <img src={property.floorPlan} alt="Floor Plan" className="floorplan-image" />
                </div>
              </div>
            )}

            {activeTab === "location" && (
              <div className="tab-pane">
                <h2>Location on Map</h2>
                <div className="map-container">
                  <iframe
                    src={property.googleMapUrl}
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CONTACT BUTTONS */}
        <div className="contact-section">
          <button className="contact-button">Contact Agent</button>
          <button className="enquiry-button">Make an Enquiry</button>
        </div>
      </div>
    </>
  );
}
