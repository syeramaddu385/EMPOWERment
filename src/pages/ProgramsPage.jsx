import { programs } from '../data/content.js';

const milestones = [
  { year: 1996, text: 'EMPOWERment founded by Delores Bailey with youth leadership roots.' },
  { year: 2001, text: 'Purchased first duplex, launching the affordable rental portfolio.' },
  { year: 2014, text: 'Opened the Midway Business Center for community-owned ventures.' },
  { year: 2023, text: 'Launched Housing Justice Fellowship with college and resident co-leads.' },
];

function ProgramsPage() {
  return (
    <div className="stack-lg">
      <header className="page-header">
        <p className="eyebrow">Programs</p>
        <h1>Holistic support for neighbors at every stage</h1>
        <p>
          Our initiatives move in sync—homes people can afford, coaching to build wealth, and
          leadership opportunities that keep the power of decision-making in community hands.
        </p>
      </header>

      <section className="grid-3">
        {programs.map((program) => (
          <article key={program.name} className="card card--program">
            <h2>{program.name}</h2>
            <p>{program.summary}</p>
            <p className="eyebrow">Focus: {program.focus}</p>
            <p className="stat">{program.impact}</p>
            <ul className="list-checks">
              {program.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="card">
        <p className="eyebrow">Milestones</p>
        <h2>Nearly three decades of resident leadership</h2>
        <ol className="timeline">
          {milestones.map((item) => (
            <li key={item.year}>
              <span className="timeline__year">{item.year}</span>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default ProgramsPage;
