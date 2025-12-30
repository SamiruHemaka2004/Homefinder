import propertiesJson from "./properties.json";

const parseDate = (added) => {
  if (!added) return new Date();
  const { month, day, year } = added;
  const dateString = `${month} ${day}, ${year}`;
  const parsed = new Date(dateString);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const derivePostcode = (location = "") => {
  const tokens = location.trim().split(" ");
  return tokens.length ? tokens[tokens.length - 1] : "";
};

export const properties = (propertiesJson.properties || []).map((item) => {
  const location = item.location || item.description || "";
  return {
    id: item.id,
    title: location,
    type: item.type || "any",
    price: Number(item.price) || 0,
    beds: item.bedrooms ?? 0,
    baths: item.bathrooms ?? 0,
    sqft: item.sqft ?? null,
    postcode: derivePostcode(item.location),
    image: item.picture ? `/${item.picture}` : "",
    dateAdded: parseDate(item.added),
    tenure: item.tenure,
    location,
    description: item.description,
    url: item.url
  };
});
