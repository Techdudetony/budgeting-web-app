/* Topbar component displayed at the top of the dashboard content area. */
export default function Topbar() {
  return (
    <header className="dashboard-topbar">
      <div>
        <p className="dashboard-topbar__eyebrow">Overview</p>
        <h2 className="dashboard-topbar__title">Financial Dashboard</h2>
      </div>

      <div className="dashboard-topbar__actions">
        <button className="dashboard-topbar__button" type="button">
          Add Income
        </button>
      </div>
    </header>
  );
}
