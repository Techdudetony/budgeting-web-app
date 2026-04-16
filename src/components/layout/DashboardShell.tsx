import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type DashboardShellProps = {
  children: React.ReactNode;
};

/* Shared layout shell used by all main application pages. */
export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="dashboard-shell">
      <Sidebar />

      <div className="dashboard-shell__main">
        <Topbar />

        <main className="dashboard-shell__content">{children}</main>
      </div>
    </div>
  );
}
