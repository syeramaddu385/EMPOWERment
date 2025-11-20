import boardScreenshot from '../assets/board-screenshot.svg';
import { partnerOrganizations, people } from '../data/content.js';

function PeoplePage() {
  return (
    <div className="stack-lg">
      <header className="page-header">
        <p className="eyebrow">People</p>
        <h1>Community members who power EMPOWERment Inc</h1>
        <p>
          From housing navigators to small business coaches, neighbors shape every decision we
          make. Use this page to track the people and organizations involved so you can easily
          add new teammates, partners, or advisors over time.
        </p>
      </header>

      <section className="card">
        <p className="eyebrow">Board of Directors</p>
        <div className="split board-section">
          <div className="stack-sm">
            <h2>Local leadership at the center</h2>
            <p>
              EMPOWERment Inc&apos;s board combines long-time residents, housing advocates, and
              business owners who keep the mission accountable to community needs. The board
              also stewards partnerships with the Midway Business Center and key civic allies.
            </p>
            <ul className="list-checks">
              <li>Grounded in anti-displacement values and Northside history.</li>
              <li>Guides fundraising for affordable rentals and youth leadership programs.</li>
              <li>Works alongside staff for transparent decision-making.</li>
            </ul>
          </div>
          <div className="board-screenshot" aria-label="Board of Directors screenshot">
            <img src={boardScreenshot} alt="Board of Directors screenshot placeholder" />
          </div>
        </div>
      </section>

      <section className="stack-sm">
        <div>
          <p className="eyebrow">Team</p>
          <h2>People moving the work forward</h2>
          <p>
            Update this roster as new staff, fellows, or volunteers join. Each card includes a
            name, a role, and space for a photo and description so you can spotlight the humans
            behind the work.
          </p>
        </div>
        <div className="grid-3">
          {people.map((person) => (
            <article key={person.name} className="card profile-card">
              <div className="avatar" aria-hidden="true">
                <span>{person.name.charAt(0)}</span>
              </div>
              <div className="profile-card__body">
                <h3>{person.name}</h3>
                <p className="eyebrow">{person.role}</p>
                <p>{person.description}</p>
                <span className="pill">{person.focus}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-sm">
        <div>
          <p className="eyebrow">Organizations</p>
          <h2>Partners who keep the mission strong</h2>
          <p>
            These organizations collaborate on housing, youth programs, and economic development.
            Add new partners as relationships grow to keep information transparent for staff and
            community members.
          </p>
        </div>
        <div className="grid-3">
          {partnerOrganizations.map((org) => (
            <article key={org.name} className="card profile-card">
              <div className="profile-card__body">
                <h3>{org.name}</h3>
                <p className="eyebrow">{org.category}</p>
                <p>{org.description}</p>
                <p className="meta">{org.contact}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PeoplePage;
