
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import heroImage from "../assets/hero-image.png";
import "./HeroImage.css";

function HeroImage() {
  const [count, setCount] = useState(0);
    return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className="hero-image-wrapper">
          <img className="heroImage" src={heroImage} alt="Hero" />

          <h2 className="heroTitle">
            Believe in finding it with the UK’s largest choice of homes
          </h2>
        </div>
      </Container>
    </>
  );
}
export default HeroImage;