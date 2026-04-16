import DashboardShell from "@/components/layout/DashboardShell";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

/* Shared layout for all dashboard-related application routes. */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardShell>{children}</DashboardShell>;
}
