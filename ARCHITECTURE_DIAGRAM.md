# Property Detail Page - Visual Diagram & Architecture

## 📐 Component Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    App.jsx                          │
│              (Router Setup)                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────┐   │
│  │ PropertiesPage   │  │ PropertyDetailPage   │   │
│  │ (Route: "/")     │  │ (Route: "/prop/:id") │   │
│  ├──────────────────┤  ├──────────────────────┤   │
│  │ - Header         │  │ - Header             │   │
│  │ - HeroImage      │  │ - Back Button        │   │
│  │ - SearchForm     │  │ - Property Info      │   │
│  │ - CardsGrid      │  │ - Image Gallery      │   │
│  │   └─PropertyCard │  │ - Tabs Section       │   │
│  │     └──onClick───┼──┤   - Description      │   │
│  │       navigate()  │  │   - Floor Plan       │   │
│  │ - FavoritesPanel │  │   - Location         │   │
│  │                  │  │ - Contact Buttons    │   │
│  └──────────────────┘  └──────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 State Management Flow

```
PropertyDetailPage Component
│
├─ State: mainImage
│  ├─ Initial: property.images[0]
│  ├─ Updated on: Thumbnail click
│  ├─ Used in: <img src={mainImage} />
│  └─ Effect: Changes main display image
│
└─ State: activeTab
   ├─ Initial: "description"
   ├─ Updated on: Tab button click
   ├─ Used in: Conditional rendering
   └─ Effect: Shows/hides tab content
```

---

## 🖱️ User Interaction Flow

```
┌─────────────────────────────────────────────────────────┐
│  USER SEES PROPERTY CARD ON MAIN PAGE                  │
│                                                         │
│  Property Title                                         │
│  £750,000                                               │
│  [View Details] [Contact Agent]                         │
└────────────┬──────────────────────────────────────────┘
             │
             │ CLICK "View Details"
             ↓
┌─────────────────────────────────────────────────────────┐
│  PropertyCard.jsx onClick handler:                      │
│  navigate(`/property/${property.id}`)                   │
└────────────┬──────────────────────────────────────────┘
             │
             │ Browser URL changes
             ↓
┌─────────────────────────────────────────────────────────┐
│  /property/prop1                                        │
└────────────┬──────────────────────────────────────────┘
             │
             │ React Router matches route
             ↓
┌─────────────────────────────────────────────────────────┐
│  PropertyDetailPage component renders                   │
│  useParams() gets propertyId = "prop1"                  │
│  properties.find(p => p.id === "prop1") gets data       │
└────────────┬──────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────┐
│  PAGE DISPLAYS:                                         │
│                                                         │
│  ← Back Button                                          │
│  Beautiful Family Home                                  │
│  House | £750,000 | 📍 Petts Wood Road                  │
│                                                         │
│  [Main Image - 400px height]                            │
│                                                         │
│  [Thumb1][Thumb2][Thumb3][Thumb4][Thumb5][Thumb6]    │
│                                                         │
│  [Description][Floor Plan][Location]                   │
│  ─────────────────────────────────────                  │
│  Description tab content showing...                     │
│                                                         │
│  [Contact Agent] [Make an Enquiry]                      │
└────────────┬──────────────────────────────────────────┘
             │
             │ USER INTERACTIONS:
             │
             ├─→ CLICK THUMBNAIL
             │   └─→ setMainImage(image)
             │       └─→ Main image updates
             │
             ├─→ CLICK TAB
             │   └─→ setActiveTab("tabName")
             │       └─→ Different content displays
             │
             └─→ CLICK BACK BUTTON
                 └─→ navigate("/")
                     └─→ Returns to properties list
```

---

## 📊 Data Mapping Diagram

```
properties.json
│
├─ Property Object:
│  ├─ id: "prop1"
│  ├─ title: "Beautiful Family Home"
│  ├─ type: "House"
│  ├─ beds: 3
│  ├─ price: 750000
│  ├─ postcode: "BR5 1PQ"
│  ├─ location: "Petts Wood Road, ..."
│  ├─ image: "https://..."
│  ├─ images: [
│  │   "https://..." (0),
│  │   "https://..." (1),
│  │   "https://..." (2),
│  │   "https://..." (3),
│  │   "https://..." (4),
│  │   "https://..." (5)
│  │ ]
│  ├─ shortDescription: "Brief summary..."
│  ├─ longDescription: "Full detailed..."
│  ├─ floorPlan: "https://..."
│  └─ googleMapUrl: "https://..."
│
└─ Mapping (properties.js):
   └─ Returns transformed objects:
      ├─ Display title → property.title
      ├─ Display type → property.type
      ├─ Display price → property.price
      ├─ Main image → property.images[0]
      ├─ Thumbnails → property.images (all 6)
      ├─ Description → property.longDescription
      ├─ Floor Plan → property.floorPlan
      ├─ Map → property.googleMapUrl
      └─ Postcode → property.postcode
```

---

## 🎨 CSS Cascade & Styling

```
PropertyDetailPage.css
│
├─ .detail-container (Max 1200px, centered)
│  │
│  ├─ .back-button (Blue, hover effect)
│  │
│  ├─ .short-info (White card, shadow)
│  │  ├─ h1 (28px, dark)
│  │  ├─ .property-type (16px, gray)
│  │  ├─ .property-price (28px, red, bold)
│  │  └─ .property-location (16px, gray)
│  │
│  ├─ .image-section (White card)
│  │  │
│  │  ├─ .main-image-container
│  │  │  └─ .main-image (400px height, cover)
│  │  │
│  │  └─ .thumbnails (CSS Grid, 6 columns)
│  │     └─ .thumbnail
│  │        ├─ Base: 100px, 0.7 opacity
│  │        ├─ Hover: opacity 1
│  │        └─ Active: blue border, glow
│  │
│  ├─ .tabs-section (White card)
│  │  │
│  │  ├─ .tab-buttons (Flex, border-bottom)
│  │  │  └─ .tab-button
│  │  │     ├─ Base: gray, no border
│  │  │     ├─ Hover: light bg, darker text
│  │  │     └─ Active: blue, blue border-bottom
│  │  │
│  │  └─ .tab-content (Padding 30px)
│  │     └─ .tab-pane (Fade-in animation)
│  │        ├─ h2 (22px, dark)
│  │        ├─ p (16px, gray, line-height 1.8)
│  │        └─ .property-specs (2 col grid)
│  │           └─ .spec-item
│  │              └─ blue left border
│  │
│  └─ .contact-section (Flex, gap 15px)
│     ├─ .contact-button (Blue)
│     └─ .enquiry-button (Green)
│
└─ @media (max-width: 768px)
   ├─ .thumbnails → 3 columns
   ├─ .main-image → 300px height
   ├─ .property-specs → 1 column
   ├─ .tab-buttons → flex-wrap
   └─ .contact-section → flex-direction column
```

---

## 📱 Responsive Grid Transformation

```
DESKTOP (1024px+)
┌─────────────────────────────────────┐
│ [Thumb1] [Thumb2] [Thumb3]          │
│ [Thumb4] [Thumb5] [Thumb6]          │
│ (6 columns)                         │
└─────────────────────────────────────┘

TABLET (768px - 1024px)
┌──────────────────────┐
│ [Thumb1] [Thumb2]    │
│ [Thumb3] [Thumb4]    │
│ [Thumb5] [Thumb6]    │
│ (3 columns)          │
└──────────────────────┘

MOBILE (<768px)
┌──────────────┐
│ [Thumb1]     │
│ [Thumb2]     │
│ [Thumb3]     │
│ [Thumb4]     │
│ [Thumb5]     │
│ [Thumb6]     │
│ (2 columns)  │
└──────────────┘
```

---

## 🔗 File Relationships

```
App.jsx (Entry Point)
│
└─ Imports:
   ├─ React Router
   ├─ PropertiesPage.jsx
   └─ PropertyDetailPage.jsx
      │
      ├─ Imports:
      │  ├─ React (useState, useParams)
      │  ├─ React Router (useNavigate)
      │  ├─ Header.jsx
      │  ├─ properties.js
      │  └─ PropertyDetailPage.css
      │
      └─ Uses:
         └─ properties array from:
            └─ properties.js
               └─ Imports from:
                  └─ properties.json

PropertyCard.jsx (Modified)
│
├─ Imports:
│  ├─ React Router (useNavigate)
│  ├─ PropertyCard.css
│  └─ React Icons
│
└─ On Click → navigate to PropertyDetailPage

properties.json (Updated with new data)
│
└─ Contains 2+ properties with:
   ├─ 6 images each
   ├─ Descriptions
   ├─ Floor plans
   └─ Google Map URLs
```

---

## ⚡ Rendering Cycle

```
1. USER NAVIGATES TO /property/prop1
   ↓
2. React Router loads PropertyDetailPage
   ↓
3. Component initializes:
   ├─ useParams() → propertyId
   ├─ properties.find() → property data
   ├─ useState(images[0]) → mainImage
   └─ useState("description") → activeTab
   ↓
4. Component renders:
   ├─ Back button
   ├─ Property info
   ├─ Main image (using mainImage state)
   ├─ Thumbnails (all images with click handlers)
   ├─ Tab buttons (with setActiveTab onClick)
   └─ Tab content (conditional based on activeTab)
   ↓
5. USER INTERACTION:
   │
   ├─ Clicks thumbnail → setMainImage() → re-render with new image
   │
   ├─ Clicks tab → setActiveTab() → re-render with new content
   │
   └─ Clicks back → navigate() → component unmounts
```

---

## 🎯 Key Metrics

```
Component Rendering:
- Initial load: 1 render
- Per thumbnail click: 1 render
- Per tab click: 1 render
- Navigation away: Component unmounts

State Updates:
- mainImage: Updated on thumbnail click
- activeTab: Updated on tab button click

Performance:
- No expensive computations
- Efficient re-renders
- Memoization where needed
- Fast image loading (cached by browser)
```

---

## 🏆 Summary: Everything Connected

```
Package.json → Defines dependencies (react-router-dom added)
    ↓
App.jsx → Sets up routing
    ↓
PropertyCard.jsx → Has navigate button
    ↓
PropertyDetailPage.jsx ← Receives navigation & ID
    ↓
properties.js ← Transforms JSON data
    ↓
properties.json ← Contains all property info (6 images, maps, etc)
    ↓
PropertyDetailPage.css ← Styles everything beautifully
    ↓
User sees professional, interactive property detail page
```

**Everything is connected and working together!** ✅
