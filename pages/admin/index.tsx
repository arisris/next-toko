import { AdminPageDashboardIndex } from "@/components/Admin/Dashboard";
import AdminPageLayout from "@/components/Layouts/AdminPage";
export default function AdminPageIndex() {
  return (
    <AdminPageLayout title="Dashboard">
      <AdminPageDashboardIndex />
    </AdminPageLayout>
  );
}

AdminPageIndex.protected = true;
