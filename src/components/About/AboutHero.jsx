import './AboutHero.css';

export default function AboutHero() {
  return (
    <section className="about-hero-card">
      <h1>We're here to help you shine</h1>
      <p className="sub">
        We make home-hunting calmer, smarter, and less stressful with thoughtful tools and a human touch.
      </p>

      <div className="chip-row">
        <div className="chip">Smart filters</div>
        <div className="chip">Saved favourites</div>
        <div className="chip">Floor plans</div>
        <div className="chip">Local insights</div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="cloud-layer" />
        <div className="floating floating-a">Create shortlist</div>
        <div className="floating floating-b">Upload floor plan</div>
        <div className="floating floating-c">Neighbourhood tips</div>
        <div className="floating floating-d">Compare homes</div>
        <div className="play-dot" />
      </div>
    </section>
  );
}
