# Property Detail Page - Visual Guide

## 📋 Page Layout Overview

```
┌─────────────────────────────────────────────────────┐
│                    HEADER                            │
│            (Logo, Navigation, etc)                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  [← Back Button]                                    │
├─────────────────────────────────────────────────────┤
│  PROPERTY TITLE                                     │
│  House                                              │
│  £750,000                                           │
│  📍 Petts Wood Road, Petts Wood, Orpington BR5     │
├─────────────────────────────────────────────────────┤
│                                                     │
│            [MAIN IMAGE - Full Width]               │
│                (400px height)                       │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [THM1] [THM2] [THM3] [THM4] [THM5] [THM6]         │
│   100px   100px   100px   100px   100px   100px     │
│  Thumbnails Grid (6 columns, clickable)            │
├─────────────────────────────────────────────────────┤
│  [Description] [Floor Plan] [Location]             │
│  ────────────────────────────────────────────────   │
│                                                     │
│  TAB CONTENT AREA:                                  │
│  - Tab 1: Property text + specs grid               │
│  - Tab 2: Floor plan image                         │
│  - Tab 3: Google Map iframe                        │
│                                                     │
│         (Min height: 400px)                         │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [Contact Agent]    [Make an Enquiry]              │
│   (Blue Button)      (Green Button)                │
└─────────────────────────────────────────────────────┘
```

---

## 🖼️ Tab Content Examples

### **Tab 1: Description**

```
┌─────────────────────────────────────┐
│ PROPERTY DESCRIPTION                │
│                                     │
│ Attractive three bedroom semi-      │
│ detached family home situated       │
│ within 0.5 miles of Petts Wood      │
│ station with fast trains to London  │
│ and within easy walking distance    │
│ of local shops, schools, bus routes │
│ and National Trust woodland...      │
│                                     │
│ TYPE          │ BEDROOMS            │
│ House         │ 3                   │
│               │                     │
│ TENURE        │ POSTCODE            │
│ Freehold      │ BR5 1PQ             │
└─────────────────────────────────────┘
```

### **Tab 2: Floor Plan**

```
┌─────────────────────────────────────┐
│ FLOOR PLAN                          │
│                                     │
│        [Floor Plan Image]           │
│          (Centered)                 │
│                                     │
└─────────────────────────────────────┘
```

### **Tab 3: Location**

```
┌─────────────────────────────────────┐
│ LOCATION ON MAP                     │
│                                     │
│    [Google Map Embedded (iframe)]   │
│    (Full width, 500px height)       │
│    - Draggable                      │
│    - Zoomable                       │
│    - Street view option             │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 Component Structure (React)

```
App.jsx
├── Router
│   └── Routes
│       ├── Route "/" → PropertiesPage.jsx
│       └── Route "/property/:propertyId" → PropertyDetailPage.jsx
│           ├── Header.jsx
│           ├── Short Info Section
│           │   ├── Title
│           │   ├── Type
│           │   ├── Price
│           │   └── Location
│           ├── Image Gallery Section
│           │   ├── Main Image
│           │   └── Thumbnails (6 images)
│           └── Tabs Section
│               ├── Tab Buttons (3)
│               └── Tab Content
│                   ├── Description Tab
│                   ├── Floor Plan Tab
│                   └── Location Tab

PropertyCard.jsx
└── onClick → navigate("/property/prop1")
```

---

## 🔄 State Management

```javascript
// In PropertyDetailPage.jsx

const [mainImage, setMainImage] = useState(property?.images[0]);
// Tracks which thumbnail image is displayed in main view

const [activeTab, setActiveTab] = useState("description");
// Tracks which tab is currently visible
```

**When user clicks:**

- **Thumbnail** → `setMainImage(image)` → Main image updates
- **Tab button** → `setActiveTab(tabName)` → Content changes

---

## 🎯 Image Gallery Logic

```javascript
// Initial state
mainImage = property.images[0]  // First image by default

// User clicks thumbnail at index 2
onClick={() => setMainImage(property.images[2])}

// Main image updates to images[2]
// That thumbnail gets blue border (active state)
// All other thumbnails remove active state
```

---

## 📊 Tab Switching Logic

```javascript
// User clicks "Floor Plan" tab
onClick={() => setActiveTab("floorplan")}

// activeTab changes from "description" to "floorplan"

// In JSX:
{activeTab === "description" && <DescriptionContent />}
{activeTab === "floorplan" && <FloorPlanContent />}
{activeTab === "location" && <LocationContent />}

// Only matching tab renders, others hidden
```

---

## 🎨 Styling Key Points

### **Colors:**

```css
Primary Blue:     #007bff  (Buttons, active tabs)
Success Green:    #28a745  (Secondary button)
Accent Red:       #ff6b6b  (Price text)
Text Dark:        #333     (Headings)
Text Light:       #666     (Body text)
Background:       #f9f9f9  (Page background)
White:            #ffffff  (Card backgrounds)
```

### **Responsive Grid:**

```css
/* Desktop: 6 columns */
@media (min-width: 1024px) {
  grid-template-columns: repeat(6, 1fr);
}

/* Tablet: 3 columns */
@media (max-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
}

/* Mobile: 2 columns */
@media (max-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}
```

---

## 🔗 Navigation Flow

```
PropertiesPage
    ↓
User clicks "View Details"
    ↓
PropertyCard.jsx triggers:
navigate(`/property/${property.id}`)
    ↓
React Router matches URL pattern:
/property/:propertyId
    ↓
PropertyDetailPage.jsx loads
useParams() extracts propertyId
    ↓
Properties array searched for matching ID
    ↓
Property details displayed
    ↓
User can:
- Click thumbnails (image changes)
- Click tabs (content changes)
- Click back button (returns to /)
```

---

## 📱 Responsive Behavior

```
DESKTOP (1024px+)
┌─────────────────────────────────────┐
│ [Main Image - Full Width]           │
│ [6-col thumbnail grid]              │
│ Tabs with full content area         │
└─────────────────────────────────────┘

TABLET (768px - 1024px)
┌──────────────────────────┐
│ [Main Image]             │
│ [3-col thumbnail grid]   │
│ Tabs with content        │
└──────────────────────────┘

MOBILE (<768px)
┌──────────────┐
│[Main Image]  │
│[2-col thumbs]│
│[Tabs]        │
│[Content]     │
│[Buttons]     │
└──────────────┘
```

---

## 🎬 Animation Effects

### **Tab Content Transition:**

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
animation: fadeIn 0.3s ease-in;
```

### **Button Hover Effect:**

```css
.contact-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px); /* Lifts up */
  box-shadow: 0 4px 12px rgba(...); /* Adds shadow */
}
```

### **Thumbnail Hover:**

```css
.thumbnail:hover {
  opacity: 1;
  /* Image becomes fully visible */
}

.thumbnail.active {
  border: 2px solid #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  /* Blue glow effect */
}
```

---

## 📦 Data Flow Example

```javascript
// In PropertyDetailPage.jsx

// 1. Get ID from URL
const { propertyId } = useParams();  // "prop1"

// 2. Find property in array
const property = properties.find(p => p.id === propertyId);
// Result:
// {
//   id: "prop1",
//   title: "Beautiful Family Home",
//   price: 750000,
//   images: ["url1", "url2", ..., "url6"],
//   longDescription: "...",
//   floorPlan: "...",
//   googleMapUrl: "..."
// }

// 3. Set initial main image
const [mainImage, setMainImage] = useState(property?.images[0]);
// mainImage = "url1"

// 4. Render with data
<img src={mainImage} />  // Shows url1
<p>{property.longDescription}</p>  // Shows description
<iframe src={property.googleMapUrl} />  // Shows map
```

---

## ✅ Quick Feature Checklist

- ✅ **Navigation:** Click "View Details" → Goes to detail page
- ✅ **Main Image:** Large 400px high image
- ✅ **Thumbnails:** 6 images in responsive grid
- ✅ **Tab 1 Description:** Property text + specs
- ✅ **Tab 2 Floor Plan:** Floor plan image display
- ✅ **Tab 3 Location:** Embedded Google Map
- ✅ **Responsive:** Works on desktop, tablet, mobile
- ✅ **Error Handling:** Shows message if property not found
- ✅ **Back Button:** Returns to properties list
- ✅ **Animations:** Smooth transitions and hover effects

---

## 🚀 Ready to Use!

All files are created and linked. Just:

1. Run `npm install` ✅ (already done)
2. Run `npm run dev`
3. Navigate to `http://localhost:5173`
4. Click "View Details" on any property

Enjoy! 🎉
