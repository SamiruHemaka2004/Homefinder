import "./FavouriteCard.css";
import heroImage from "../assets/hero-image.png";

export default function FavouriteCard({ property, onRemove }) {
	const imageSrc = property.picture && property.picture.trim() !== "" ? property.picture : heroImage;

	const handleDragStart = (e) => {
		if (e.target.closest("button")) {
			e.preventDefault();
			return;
		}
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("application/json", JSON.stringify(property));
	};

	return (
		<li 
			className="favourite-card"
			draggable="true"
			onDragStart={handleDragStart}
			style={{ cursor: "grab" }}
		>
			<img
				className="favourite-thumb"
				src={imageSrc}
				alt={property.location}
				onError={(event) => {
					event.currentTarget.onerror = null;
					event.currentTarget.src = heroImage;
				}}
			/>
			<div className="favourite-info">
			<p className="favourite-title">{property.location}</p>
				<p className="favourite-price">£{property.price.toLocaleString()}</p>
			</div>
			<button
				className="favourite-remove"
				onClick={() => onRemove(property.id)}
				aria-label={`Remove ${property.location} from favourites`}
			>
				Remove
			</button>
		</li>
	);
}
