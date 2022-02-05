import AdminPageLayout from "@/components/Layouts/AdminPage";
import { GetServerSideProps, NextPageContext } from "next";
import { getSession } from "next-auth/react";

export default function AdminPageIndex() {
  return (
    <AdminPageLayout>
      <h3>This is Admin Page</h3>
    </AdminPageLayout>
  );
}

AdminPageIndex.protected = true;
