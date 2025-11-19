import { useEffect, useState } from 'react';

const API_URL =
  'https://datausa.io/api/data?Geography=04000US37&measure=Median%20Property%20Value,Median%20Gross%20Rent&year=latest';

function HousingInsight() {
  const [insight, setInsight] = useState({ status: 'idle' });

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setInsight({ status: 'loading' });
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Unable to fetch state housing data');
        }
        const payload = await response.json();
        const [latest] = payload.data || [];
        if (isMounted && latest) {
          setInsight({
            status: 'success',
            data: {
              year: latest.Year,
              rent: latest['Median Gross Rent'],
              value: latest['Median Property Value'],
            },
          });
        } else if (isMounted) {
          setInsight({ status: 'error', message: 'No results returned.' });
        }
      } catch (error) {
        if (isMounted) {
          setInsight({ status: 'error', message: error.message });
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card housing-insight">
      <div>
        <p className="eyebrow">NC Housing Snapshot</p>
        <h3>State-wide affordability trends</h3>
        <p>
          We track statewide indicators to advocate for Orange County families. This live
          feed comes from the public DataUSA housing dataset.
        </p>
      </div>
      <div className="insight-grid" aria-live="polite">
        {insight.status === 'loading' && <p>Loading current data…</p>}
        {insight.status === 'error' && (
          <p role="alert">We could not load the dataset right now. Please try again soon.</p>
        )}
        {insight.status === 'success' && (
          <>
            <p>
              <span className="stat">${insight.data.value?.toLocaleString()}</span>
              <span className="stat-label">Median home value ({insight.data.year})</span>
            </p>
            <p>
              <span className="stat">${insight.data.rent?.toLocaleString()}</span>
              <span className="stat-label">Median monthly rent ({insight.data.year})</span>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default HousingInsight;
