import { useEffect, useMemo, useState } from 'react';

const API_URL = '/api/housing';

function HousingInsight() {
  const [state, setState] = useState({ status: 'idle', records: [], message: '' });

  const latestRecord = useMemo(
    () => (state.records.length ? state.records[state.records.length - 1] : null),
    [state.records],
  );

  const sendRequest = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: options.body
        ? { 'Content-Type': 'application/json', ...(options.headers || {}) }
        : options.headers,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Request failed');
    }
  }

    const content = await response.json().catch(() => null);
    return content;
  };

  const refreshRecords = async () => {
    setState((prev) => ({ ...prev, status: 'loading', message: '' }));
    try {
      const records = await sendRequest(API_URL);
      setState({ status: 'success', records: Array.isArray(records) ? records : [], message: '' });
    } catch (error) {
      setState((prev) => ({ ...prev, status: 'error', message: error.message }));
    }
  };

  const runMutation = async (mutation, successMessage) => {
    try {
      await mutation();
      await refreshRecords();
      setState((prev) => ({ ...prev, message: successMessage }));
    } catch (error) {
      setState((prev) => ({ ...prev, status: 'error', message: error.message }));
    }
  };

  const handleCreate = async () => {
    const reference = latestRecord || { year: 2020, medianHomeValue: 280000, medianRent: 1000 };
    const payload = {
      year: reference.year + 1,
      medianHomeValue: reference.medianHomeValue + 8500,
      medianRent: reference.medianRent + 20,
    };

    await runMutation(
      () => sendRequest(API_URL, { method: 'POST', body: JSON.stringify(payload) }),
      'Created a new housing record with POST.',
    );
  };

  const handleUpdate = async () => {
    if (!latestRecord) {
      setState((prev) => ({ ...prev, status: 'error', message: 'No records to update yet. Try creating one first.' }));
      return;
    }

    const payload = {
      ...latestRecord,
      medianRent: latestRecord.medianRent + 15,
    };

    await runMutation(
      () => sendRequest(`${API_URL}/${latestRecord.id}`, { method: 'PUT', body: JSON.stringify(payload) }),
      'Updated the most recent record with PUT.',
    );
  };

  const handleDelete = async () => {
    if (!latestRecord) {
      setState((prev) => ({ ...prev, status: 'error', message: 'No records left to delete.' }));
      return;
    }

    await runMutation(
      () => sendRequest(`${API_URL}/${latestRecord.id}`, { method: 'DELETE' }),
      'Removed the latest record with DELETE.',
    );
  };

  useEffect(() => {
    refreshRecords();
  }, []);

  return (
    <section className="card housing-insight">
      <div className="stack-sm">
        <p className="eyebrow">NC Housing Snapshot</p>
        <h3>Check affordability with our mock API</h3>
        <p>
          This widget now talks to a tiny RESTful API served by the dev server. It supports the
          classic CRUD verbs (GET, POST, PUT, DELETE) so you can see how the same data flows through
          each type of request.
        </p>
        <form className="form" onSubmit={loadInsight}>
          <label>
            Choose a location
            <select value={selection} onChange={(event) => setSelection(event.target.value)}>
              {LOCATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <div className="split" style={{ alignItems: 'flex-end' }}>
            <p className="meta">Our mock API keeps responses fast and predictable for presentations.</p>
            <button type="submit" className="cta-button">
              Check housing numbers
            </button>
          </div>
        </form>
      </div>

      <div className="insight-grid" aria-live="polite">
        {state.status === 'loading' && <p>Loading current data…</p>}
        {state.status === 'error' && (
          <p role="alert">{state.message || 'We could not load the dataset right now.'}</p>
        )}
        {state.status === 'success' && latestRecord && (
          <>
            <p>
              <span className="stat">${latestRecord.medianHomeValue?.toLocaleString()}</span>
              <span className="stat-label">Median home value ({latestRecord.year})</span>
            </p>
            <p>
              <span className="stat">${latestRecord.medianRent?.toLocaleString()}</span>
              <span className="stat-label">Median monthly rent ({latestRecord.year})</span>
            </p>
            {insight.data.note && <p className="meta">{insight.data.note}</p>}
          </>
        )}
      </div>

      <div className="insight-actions" aria-live="polite">
        <p className="eyebrow">Try each CRUD request</p>
        <div className="action-buttons">
          <button type="button" onClick={refreshRecords} disabled={state.status === 'loading'}>
            GET all records
          </button>
          <button type="button" onClick={handleCreate} disabled={state.status === 'loading'}>
            POST a new year
          </button>
          <button type="button" onClick={handleUpdate} disabled={state.status === 'loading'}>
            PUT update latest
          </button>
          <button type="button" onClick={handleDelete} disabled={state.status === 'loading'}>
            DELETE latest
          </button>
        </div>
        <p className="helper-text">
          {state.message
            || 'Use the buttons above to see how each HTTP verb changes the data returned by GET.'}
        </p>
      </div>
    </section>
  );
}

export default HousingInsight;
