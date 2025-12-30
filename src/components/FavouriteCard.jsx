import "./FavouriteCard.css";
import heroImage from "../assets/hero-image.png";

export default function FavouriteCard({ property, onRemove }) {
	const imageSrc = property.image && property.image.trim() !== "" ? property.image : heroImage;

	return (
		<li className="favourite-card">
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
