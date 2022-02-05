import NestedListMenu, { NestedListMenuItemsType } from "@/components/Menu/NestedListMenu";
import Skeleton from "@/components/Skeleton/Skeleton";
import { trpc } from "@/lib/trpc";
import { Card, List, ListItem } from "konsta/react";
import Image from "next/image";
import { FaCheck, FaMoneyBill } from "react-icons/fa";
import { MdFolder } from "react-icons/md";

const menuItemsData: NestedListMenuItemsType[] = [
  {
    title: "Product",
    icon: MdFolder,
    defaultOpen: true,
    subMenu: [
      {
        title: "Manage Product",
        icon: MdFolder
      },
      {
        title: "Add Product",
        icon: MdFolder
      },
      {
        title: "Edit Product",
        icon: MdFolder
      }
    ]
  },
  {
    title: "Categories",
    icon: MdFolder,
    subMenu: [
      {
        title: "Manage Categories",
        icon: MdFolder
      },
      {
        title: "Add Categories",
        icon: MdFolder
      },
      {
        title: "Edit Categories",
        icon: MdFolder
      }
    ]
  }
];

export default function SidebarAdminMenu() {
  const { data: user } = trpc.useQuery(["user.me"]);
  return (
    <Card className="relative z-0 !m-0 !p-0 !shadow-none">
      {user ? (
        <List className="!my-0 !-mx-4" hairlines={false}>
          <ListItem
            media={
              <Image
                src={user.image}
                width="64"
                height="64"
                className="rounded-full"
                priority
              />
            }
            title={user.name}
            subtitle={
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-500 dark:text-gray-100">
                  Verified Accounts
                </span>
                <FaCheck className="text-green-500" />
              </div>
            }
          />
          <ListItem
            media={<FaMoneyBill size={28} />}
            mediaClassName="text-green-500 -mr-1"
            strongTitle
            title="Saldo"
            hairlines={false}
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
