import { useState } from 'react';
import './PropertyCard.css';
import heroImage from "../assets/hero-image.png";
import { FaRegHeart, FaHeart } from 'react-icons/fa';


export default function MediaCard() {
  // Initialize state for the favorite status (false for unfavorited)
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle the click event and toggle the state
  const handleClick = () => {
    setIsFavorite(!isFavorite);
    // You can add logic here to interact with an API or update a parent component's state
    console.log(`Item is now ${isFavorite ? 'unfavorited' : 'favorited'}`);
  };

  return (
    <div className="property-card">
        <div className="property-image">
            <img src={heroImage} alt="Property" />
            <div className='title-fav-div'>
                <h3 className="property-title">Beautiful Family Home</h3>
                <button onClick={handleClick}
                className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
                aria-label={isFavorite ? "Unfavorite" : "Favorite"}
                >
                {/* Conditionally render the filled or outlined heart icon */}
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
            </div>
        </div>
        <div className="property-details">
            <p className="property-price">£350,000</p>
            <p className="property-beds">3 Beds • 2 Baths • 1500 sqft</p>
            <p className="property-postcode">Postcode: AB12 3CD</p>
        </div>
        <div>
            <button className="view-details-button">View Details</button>
            <button className="contact-agent-button">Contact Agent</button>
        </div>
    </div>
  );
}
