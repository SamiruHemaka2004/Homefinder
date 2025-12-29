import MediaCard from "../components/PropertyCard.jsx";
import "./CardsGrid.css";

export default function CardsGrid({data}) {
    return (
        <div className="Cards-grid">
      {data.length > 0 ? (
        data.map(item => (
          <MediaCard key={item.id} property={item} />
        ))
      ) : (
        <p style={{textAlign: 'center', gridColumn: '1 / -1', padding: '40px'}}>
          No properties found matching your criteria. Try adjusting your filters.
        </p>
      )}
    </div>
    )
}