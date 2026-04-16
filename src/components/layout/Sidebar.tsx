import Link from "next/link";

/* Sidebar navigation item definitions used to render app navigation. */
const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Income", href: "/income" },
  { label: "Expenses", href: "/expenses" },
  { label: "Bills", href: "/bills" },
  { label: "Savings", href: "/savings" },
  { label: "Simulations", href: "/simulations" },
  { label: "Notifications", href: "/notifications" },
  { label: "Settings", href: "/settings" },
];

/* Sidebar component used across the budgeting application dashboard layout. */
export default function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__brand">
        <h1 className="dashboard-sidebar__title">Budgeting App</h1>
        <p className="dashboard-sidebar__subtitle">Plan with confidence</p>
      </div>

      <nav className="dashboard-sidebar__nav" aria-label="Primary navigation">
        <ul className="dashboard-sidebar__list">
          {navItems.map((item) => (
            <li key={item.href} className="dashboard-sidebar__item">
              <Link href={item.href} className="dashboard-sidebar__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
