import './AboutValue.css';

export default function AboutValue() {
  return (
    <section className="about-section">
      <p className="eyebrow">Our value</p>
      <h2>Less “ugh”, more “yay!”.</h2>
      <div className="chip-row center">
        <span className="chip ghost">Easy guidance</span>
        <span className="chip ghost">Time-saving</span>
        <span className="chip ghost">Tailored to you</span>
        <span className="chip ghost">Clear updates</span>
        <span className="chip ghost">Quality listings</span>
      </div>
      <p className="section-copy">
        We sweat the details so you can focus on the fun part—choosing the place you’ll call home.
      </p>
    </section>
  );
}
