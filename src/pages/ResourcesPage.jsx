import { resources } from '../data/content.js';

function ResourcesPage() {
  return (
    <div className="stack-lg">
      <header className="page-header">
        <p className="eyebrow">Resource hub</p>
        <h1>Navigate housing questions with confidence</h1>
        <p>
          We collect verified tools and partners so families spend less time researching and
          more time thriving. Use the quick links or download our full housing guide.
        </p>
        <button type="button" className="cta-button">
          Download resource guide (PDF)
        </button>
      </header>

      <section className="grid-3">
        {resources.map((resource) => (
          <article key={resource.title} className="card">
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a className="text-link" href={resource.link} target="_blank" rel="noreferrer">
              Visit partner site
            </a>
          </article>
        ))}
      </section>

      <section className="card">
        <p className="eyebrow">Frequently asked questions</p>
        <details>
          <summary>Who qualifies for EMPOWERment housing?</summary>
          <p>
            We prioritize families earning below 80% of area median income with deep roots in
            Northside and the Rogers Road communities.
          </p>
        </details>
        <details>
          <summary>Can you connect me to legal aid?</summary>
          <p>
            Yes! Complete the short form on the Volunteer page and our housing navigator will
            call within two business days.
          </p>
        </details>
        <details>
          <summary>Do you offer Spanish-language support?</summary>
          <p>Absolutely—we partner with local interpreters and bilingual volunteers.</p>
        </details>
      </section>
    </div>
  );
}

export default ResourcesPage;
