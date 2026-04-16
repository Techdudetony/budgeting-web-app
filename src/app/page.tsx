import Link from "next/link";

/* Root landing page for the budgeting app */
export default function HomePage() {
  return (
    <main className="page">
      <section className="container">
        <h1 className="home-title">Budgeting Web Application</h1>

        <p className="home-description">
          A smart budgeting platform for tracking income, expenses, bills, debt,
          savings projections, and financial scenarios.
        </p>

        <div className="home-actions">
          <Link href="/dashboard" className="home-primary-link">
            Open Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
