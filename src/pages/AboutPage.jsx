import Header from "../components/header.jsx";
import AboutHero from "../components/About/AboutHero.jsx";
import AboutValue from "../components/About/AboutValue.jsx";
import TeamGrid from "../components/About/TeamGrid.jsx";
import "./AboutPage.css";

const team = [
  { name: "Sarah Johnson", role: "Founder & CEO", note: "Keeps the vision clear and the bar high." },
  { name: "Michael Chen", role: "Head of Technology", note: "Builds the tools that make search feel easy." },
  { name: "Emma Williams", role: "Customer Success", note: "Here to help you love the process." }
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="about-shell">
        <AboutHero />
        <AboutValue />
        <TeamGrid team={team} />
      </main>
    </>
  );
}
