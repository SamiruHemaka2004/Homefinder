import "./FavouriteCard.css";
import heroImage from "../assets/hero-image.png";

export default function FavouriteCard({ property, onRemove }) {
	const imageSrc = property.image && property.image.trim() !== "" ? property.image : heroImage;

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
				alt={property.title}
				onError={(event) => {
					event.currentTarget.onerror = null;
					event.currentTarget.src = heroImage;
				}}
			/>
			<div className="favourite-info">
				<p className="favourite-title">{property.title}</p>
				<p className="favourite-price">£{property.price.toLocaleString()}</p>
			</div>
			<button
				className="favourite-remove"
				onClick={() => onRemove(property.id)}
				aria-label={`Remove ${property.title} from favourites`}
			>
				Remove
			</button>
		</li>
	);
}
