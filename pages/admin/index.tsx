import AdminPageLayout from "@/components/Layouts/AdminPage";
import { useToast } from "@/lib/hooks/useToast";
import { Portal } from "@headlessui/react";
import { Button, Toast } from "konsta/react";
import { GetServerSideProps, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { Fragment } from "react";

export default function AdminPageIndex() {
  const toast = useToast();
  
  return (
    <AdminPageLayout>
      <h3>This is Admin Page</h3>
    </AdminPageLayout>
  );
}

AdminPageIndex.protected = true;
