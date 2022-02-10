import AdminPageLayout from "@/components/Layouts/AdminPage";
import { useHeadlessuiDialog } from "@/lib/hooks/useHeadlessuiDialog";
import { ToastType, useToast } from "@/lib/hooks/useToast";
import { Portal } from "@headlessui/react";
import { Button, Toast } from "konsta/react";
import { GetServerSideProps, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { Fragment } from "react";

export default function AdminPageIndex() {
  const toast = useToast();
  const dialog = useHeadlessuiDialog();

  return (
    <AdminPageLayout>
      <div className="flex justify-between items-center w-full border mb-20">
        <h3>This is Admin Page</h3>
        <h3>This is Admin Page</h3>
      </div>
      <Button
        inline
        onClick={() => {
          // toast.message({
          //   title: "Hello World",
          //   message: "Whoaaaaa!!!",
          //   type: ToastType.SUCCESS
          // })
          dialog.create(<h2>Hello World</h2>);
        }}
      >
        Toast
      </Button>
    </AdminPageLayout>
  );
}

AdminPageIndex.protected = true;
