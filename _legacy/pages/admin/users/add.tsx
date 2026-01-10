
import AdminPageLayout from "@/components/Layouts/AdminPage";
import { MdAdd } from "react-icons/md";

export default function Page() {
  return (
    <AdminPageLayout title="Add New User" icon={<MdAdd size={32} />}>
      Add new User
    </AdminPageLayout>
  );
}