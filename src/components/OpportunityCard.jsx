function OpportunityCard({ opportunity }) {
  return (
    <article className="card opportunity-card">
      <header>
        <p className="eyebrow">Volunteers needed: {opportunity.needed}</p>
        <h3>{opportunity.title}</h3>
      </header>
      <p>{opportunity.description}</p>
      <dl className="definition-list">
        <div>
          <dt>Date</dt>
          <dd>{opportunity.date}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{opportunity.location}</dd>
        </div>
      </dl>
      <button type="button" className="cta-button cta-button--ghost">
        Learn more
      </button>
    </article>
  );
}

export default OpportunityCard;
