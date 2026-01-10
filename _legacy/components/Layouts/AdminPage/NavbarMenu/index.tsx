import DialogConfirm from "@/components/Dialog/DialogConfirm";
import NestedListMenu, {
  NestedListMenuItemProps
} from "@/components/Menu/NestedListMenu";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useHeadlessuiDialog } from "@/lib/hooks/useHeadlessuiDialog";
import { trpc } from "@/lib/trpc";
import { Card, Link, List, ListItem } from "konsta/react";
import NextLink from "next/link";
import Image from "next/image";
import { FaCheck, FaMoneyBill } from "react-icons/fa";
import {
  MdAdd,
  MdCategory,
  MdDashboard,
  MdEdit,
  MdInventory,
  MdList,
  MdLogout,
  MdPeople
} from "react-icons/md";
import { signOut } from "next-auth/react";

const menuItemsData: NestedListMenuItemProps[] = [
  {
    title: "Dashboard",
    media: <MdDashboard size={24} />,
    menuListItemActive: true
  },
  {
    title: "Users",
    colors: {
      primaryTextIos: "text-blue-500"
    },
    media: <MdPeople size={24} />,
    defaultOpen: true,
    subMenu: [
      {
        title: "Manage User",
        href: "/admin/users",
        media: <MdList size={24} />
      },
      {
        title: "Add User",
        href: "/admin/users/add",
        media: <MdAdd size={24} />
      }
    ]
  },
  {
    title: "Product",
    colors: {
      primaryTextIos: "text-blue-500"
    },
    media: <MdInventory size={24} />,
    defaultOpen: false,
    subMenu: [
      {
        title: "Manage Product",
        media: <MdList size={24} />
      },
      {
        title: "Add Product",
        media: <MdAdd size={24} />
      }
    ]
  },
  {
    title: "Categories",
    media: <MdCategory size={24} />,
    subMenu: [
      {
        title: "Manage Categories",
        media: <MdList size={24} />
      },
      {
        title: "Add Categories",
        media: <MdAdd size={24} />
      }
    ]
  }
];

export default function SidebarAdminMenu() {
  const { data: user } = { data: {} as Record<string, unknown> };
  const dialog = useHeadlessuiDialog();
  return (
    <Card className="relative mb-[1000px] z-0 !m-0 !p-0 !shadow-none">
      {user ? (
        <List className="!my-0 !-mx-4">
          <ListItem
            media={
              <Image
                src={user.image as string}
                width="64"
                height="64"
                className="rounded-full"
                priority
                alt={""}
              />
            }
            // @ts-ignore
            title={
              <NextLink href="/admin/profile">
                <Link component="a">{user.name}</Link>
              </NextLink>
            }
            subtitle={
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-500 dark:text-gray-100">
                  Verified Accounts
                </span>
                <FaCheck className="text-green-500" />
              </div>
            }
            after={
              <Link
                iconOnly
                navbar
                title="Logout?"
                onClick={() =>
                  dialog.create(
                    <DialogConfirm
                      title="Are you sure to logout?"
                      onConfirm={(ok) => {
                        if (ok) signOut();
                        dialog.destroy();
                      }}
                    />
                  )
                }
              >
                <MdLogout size={24} />
              </Link>
            }
          />
          <ListItem
            media={<FaMoneyBill size={28} />}
            mediaClassName="text-green-500 -mr-1"
            strongTitle
            title="Saldo"
            titleWrapClassName="text-xl tracking-wide"
          />
          <ListItem title="Sisa Saldo" after={<span>RP. 520.105</span>} />
        </List>
      ) : (
        <div className="flex gap-2 items-center">
          <Skeleton className="w-14 h-14 rounded-full m-2" />
          <Skeleton className="w-[60%] h-14 rounded m-2" />
        </div>
      )}
      <NestedListMenu isLoading={!user} data={menuItemsData} skeletonSize={5} />
    </Card>
  );
}
