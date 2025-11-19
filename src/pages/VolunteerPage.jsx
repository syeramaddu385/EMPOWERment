import { useState } from 'react';
import OpportunityCard from '../components/OpportunityCard.jsx';
import { volunteerOpportunities } from '../data/content.js';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  interest: volunteerOpportunities[0].title,
  message: '',
};

function VolunteerPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="stack-lg">
      <header className="page-header">
        <p className="eyebrow">Volunteer</p>
        <h1>Show up for housing justice</h1>
        <p>
          Tutors, storytellers, Spanish interpreters, and DIY enthusiasts keep our work moving.
          Tell us how you&apos;d like to plug in and we&apos;ll follow up with next steps.
        </p>
      </header>

      <section className="grid-3">
        {volunteerOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </section>

      <section className="card">
        <h2>Sign up to serve</h2>
        <p>We respond within two business days with onboarding information.</p>
        {submitted ? (
          <p role="status" className="success-banner">
            Thanks, {form.name || 'friend'}! We&apos;ll send next steps to {form.email}.
          </p>
        ) : (
          <form className="form" onSubmit={handleSubmit} id="volunteer-form">
            <label>
              Full name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone number
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </label>
            <label>
              Opportunity of interest
              <select name="interest" value={form.interest} onChange={handleChange}>
                {volunteerOpportunities.map((opportunity) => (
                  <option key={opportunity.id} value={opportunity.title}>
                    {opportunity.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tell us more
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                placeholder="Skills, availability, language preferences"
              />
            </label>
            <button type="submit" className="cta-button">
              Submit interest
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default VolunteerPage;
