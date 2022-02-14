import AdminPageLayout from "@/components/Layouts/AdminPage";
import { inferQueryInput, trpc, useTrpcInfiniteQuery } from "@/lib/trpc";
import { Badge, List, ListInput, ListItem } from "konsta/react";
import { MdPeople } from "react-icons/md";

export default function Page() {
  // const { data: users } = trpc.useQuery([
  //   "user.all",
  //   {
  //     limit: 10,
  //     cursor: 0,
  //     search: null
  //   }
  // ]);
  // console.log(users);
  return (
    <AdminPageLayout title="Manage Users" icon={<MdPeople size={32} />}>
      <div className="grid grid-cols-12 gap-2">
        <List inset className="col-span-4 shadow">
          <ListItem strongTitle titleFontSizeMaterial="text-xl" title="Sort" />
          <ListItem
            menuListItem={true}
            menuListItemActive={true}
            title="All Users"
            after={<Badge>10</Badge>}
          />
          <ListItem
            menuListItem={true}
            title="Active"
            after={<Badge>10</Badge>}
          />
          <ListItem
            menuListItem={true}
            title="Inactive"
            after={<Badge>10</Badge>}
          />
          <ListItem
            menuListItem={true}
            title="Banned"
            after={<Badge>10</Badge>}
          />
        </List>
        <List inset className="col-span-8">
          <ul className="inline-flex justify-between items-center w-full">
            <ListInput placeholder="Sort" />
            <ListInput placeholder="Search User" />
          </ul>
        </List>
      </div>
    </AdminPageLayout>
  );
}
