import PageIntro from "@/components/ui/PageIntro";

/* Main dashbvoard overview page */
export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <PageIntro
        title="Dashboard"
        description="View your financial summary, balances, projections, and alerts in one place."
      />

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <h3 className="dashboard-card__title">Monthly Income</h3>
          <p className="dashboard-card__value">$0.00</p>
        </article>

        <article className="dashboard-card">
          <h3 className="dashboard-card__title">Monthly Expenses</h3>
          <p className="dashboard-card__value">$0.00</p>
        </article>

        <article className="dashboard-card">
          <h3 className="dashboard-card__title">Projected Savings</h3>
          <p className="dashboard-card__value">$0.00</p>
        </article>

        <article className="dashboard-card">
          <h3 className="dashboard-card__title">Upcoming Bills</h3>
          <p className="dashboard-card__value">0</p>
        </article>
      </section>
    </div>
  );
}
