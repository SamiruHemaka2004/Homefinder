import propertiesJson from "./properties.json";
import floorplan6 from "../assets/floorPlan/floorplan6.png";
import floorplan7 from "../assets/floorPlan/floorplan7.png";

// Map floorplan paths to imported images
const floorplanMap = {
  "src\\assets\\floorPlan\\floorplan6.png": floorplan6,
  "./assets/floorPlan/floorplan6.png": floorplan6,
  "src\\assets\\floorPlan\\floorplan7.png": floorplan7,
  "./assets/floorPlan/floorplan7.png": floorplan7,
};

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
  const location = item.location || "";
  return {
    id: item.id,
    title: item.title || location,
    type: item.type || "any",
    price: Number(item.price) || 0,
    beds: item.beds ?? 0,
    baths: item.baths ?? 0,
    sqft: item.sqft ?? null,
    postcode: item.postcode || derivePostcode(location),
    image: item.image || "",
    images: item.images || [],
    floorPlan: floorplanMap[item.floorPlan] || item.floorPlan || "",
    googleMapUrl: item.googleMapUrl || "",
    dateAdded: item.dateAdded || parseDate(item.added).getTime(),
    tenure: item.tenure,
    location,
    shortDescription: item.shortDescription || "",
    longDescription: item.longDescription || item.description || "",
    description: item.longDescription || item.description || "",
    url: item.url,
  };
});
