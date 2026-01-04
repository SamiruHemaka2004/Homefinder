import './TeamCard.css';

export default function TeamCard({ name, role, note }) {
  return (
    <div className="team-card">
      <div className="avatar">{name.charAt(0)}</div>
      <h3>{name}</h3>
      <p className="role">{role}</p>
      <p className="note">{note}</p>
    </div>
  );
}
