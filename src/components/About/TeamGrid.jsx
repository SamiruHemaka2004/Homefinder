import TeamCard from './TeamCard.jsx';
import './TeamGrid.css';

export default function TeamGrid({ team }) {
  return (
    <section className="about-section team">
      <p className="eyebrow">Meet the team</p>
      <h2>Smart minds, big hearts.</h2>
      <p className="team-sub">Friendly experts who keep things clear, calm, and human.</p>
      <div className="team-grid">
        {team.map((member) => (
          <TeamCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
}
