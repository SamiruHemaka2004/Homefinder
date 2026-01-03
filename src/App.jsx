import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertiesPage from "./pages/PropertiesPage.jsx";
import PropertyDetailPage from "./pages/PropertyDetailPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertiesPage />} />
        <Route path="/property/:propertyId" element={<PropertyDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;