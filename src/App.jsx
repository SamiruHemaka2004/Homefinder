import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertiesPage from "./pages/PropertiesPage.jsx";
import PropertyDetailPage from "./pages/PropertyDetailPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PropertiesPage />} />
        <Route path="/property/:propertyId" element={<PropertyDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;