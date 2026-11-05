export default function Loading() {
  return (
    <main className="property-detail-loading" aria-busy="true" aria-live="polite">
      <div className="shell">
        <div className="property-loading-spinner" aria-hidden="true" />
        <p>Loading properties...</p>
        <span className="visually-hidden">Loading properties</span>
      </div>
    </main>
  );
}
