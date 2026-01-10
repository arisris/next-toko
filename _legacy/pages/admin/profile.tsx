import AdminProfile from "@/components/Admin/Profile";
import AdminPageLayout from "@/components/Layouts/AdminPage";

export default function Profile() {
  return (
    <AdminPageLayout title="My Profile">
      <AdminProfile />
    </AdminPageLayout>
  );
}