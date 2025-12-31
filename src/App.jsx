import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertiesPage from "./pages/PropertiesPage.jsx";
import PropertyDetailPage from "./pages/PropertyDetailPage.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertiesPage />} />
        <Route path="/property/:propertyId" element={<PropertyDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;