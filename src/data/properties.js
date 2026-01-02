import propertiesJson from "./properties.json";
import floorplan6 from "../assets/floorPlan/floorplan6.png";
import floorplan7 from "../assets/floorPlan/floorplan7.png";

// Import house1 gallery images
import house1_1 from "../assets/gallery/house1/house1.1.jpg";
import house1_2 from "../assets/gallery/house1/house1.2.jpg";
import house1_3 from "../assets/gallery/house1/house1.3.png";
import house1_4 from "../assets/gallery/house1/house1.4.png";
import house1_5 from "../assets/gallery/house1/house1.5.png";
import house1_6 from "../assets/gallery/house1/house1.6.png";
import house1_7 from "../assets/gallery/house1/house1.7.png";

// Import flat1 gallery images
import flat1_1 from "../assets/gallery/flat1/flat1.1.jpg";
import flat1_2 from "../assets/gallery/flat1/flat1.2.png";
import flat1_3 from "../assets/gallery/flat1/flat1.3.png";
import flat1_4 from "../assets/gallery/flat1/flat1.4.png";
import flat1_5 from "../assets/gallery/flat1/flat1.5.png";
import flat1_6 from "../assets/gallery/flat1/flat1.6.png";

// Map floorplan paths to imported images
const floorplanMap = {
  "src\\assets\\floorPlan\\floorplan6.png": floorplan6,
  "./assets/floorPlan/floorplan6.png": floorplan6,
  "src\\assets\\floorPlan\\floorplan7.png": floorplan7,
  "./assets/floorPlan/floorplan7.png": floorplan7,
};

// Map gallery image paths to imported images
const imageMap = {
  "./assets/gallery/house/house1.1.jpg": house1_1,
  "./assets/gallery/house/house1.2.jpg": house1_2,
  "./assets/gallery/house/house1.3.png": house1_3,
  "./assets/gallery/house/house1.4.png": house1_4,
  "./assets/gallery/house/house1.5.png": house1_5,
  "./assets/gallery/house/house1.6.png": house1_6,
  "./assets/gallery/house/house1.7.png": house1_7,
  "./assets/gallery/flat/flat1.1.jpg": flat1_1,
  "./assets/gallery/flat/flat1.2.png": flat1_2,
  "./assets/gallery/flat/flat1.3.png": flat1_3,
  "./assets/gallery/flat/flat1.4.png": flat1_4,
  "./assets/gallery/flat/flat1.5.png": flat1_5,
  "./assets/gallery/flat/flat1.6.png": flat1_6,
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
    image: imageMap[item.image] || item.image || "",
    images: (item.images || []).map((img) => imageMap[img] || img),
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
