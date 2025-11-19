import HousingInsight from '../components/HousingInsight.jsx';
import { programs } from '../data/content.js';

function HomePage() {
  return (
    <div className="stack-lg">
      <section className="hero">
        <p className="eyebrow">Neighbors building power since 1996</p>
        <h1>
          Centering Black and Brown voices to keep Chapel Hill and Carrboro affordable,
          inclusive, and thriving.
        </h1>
        <p>
          EMPOWERment Inc provides housing, economic development, and leadership programs so
          that long-time residents can stay rooted in the communities they built.
        </p>
        <div className="hero__actions">
          <a className="cta-button" href="/volunteer">
            I want to volunteer
          </a>
          <a className="cta-button cta-button--secondary" href="/resources">
            Explore resources
          </a>
        </div>
      </section>

      <section className="grid-3" aria-label="Impact highlights">
        {programs.map((program) => (
          <article key={program.name} className="card">
            <p className="eyebrow">{program.focus}</p>
            <h3>{program.name}</h3>
            <p>{program.summary}</p>
            <p className="stat">{program.impact}</p>
          </article>
        ))}
      </section>

      <section className="card">
        <div className="split">
          <div>
            <p className="eyebrow">Community commitments</p>
            <h2>Rooted in Northside. Ready for what&apos;s next.</h2>
            <p>
              EMPOWERment Inc stewards affordable rentals, incubates neighborhood-owned
              businesses, and equips residents with advocacy tools. Our strategy is simple:
              listen first, invest where public dollars fall short, and celebrate culture in
              every project.
            </p>
          </div>
          <ul className="list-checks">
            <li>35 units of permanently affordable housing</li>
            <li>Micro-grants for Black-owned main street businesses</li>
            <li>Leadership training for students and first-time advocates</li>
          </ul>
        </div>
      </section>

      <HousingInsight />
    </div>
  );
}

export default HomePage;
