import PropertyCard from "../components/PropertyCard.jsx";

export default function CardsGrid({data}) {
    return (
        <div className="Cards-grid">
      {data.map(item => (
        <PropertyCard key={item.id} property={item} />
      ))}
    </div>
    )
}