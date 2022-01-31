import clsx from "clsx";
import { trpc } from "@/lib/trpc";
import ListSkeleton from "@/components/Skeleton/ListSkeleton";
import FrontPageLayout from "components/Layouts/FrontPage";
import { Tab } from "@headlessui/react";
import { Button } from "konsta/react";
import { FaCogs } from "react-icons/fa";
import SidebarUserMenu from "@/components/Menu/SidebarUserMenu";

const TabBtn = ({ label = "" }) => {
  return (
    <Tab
      as={"div"}
      className={({ selected }) =>
        clsx("w-full relative z-0", {
          "border-b-[3px] border-primary-light": selected
        })
      }
    >
      {({ selected }) => (
        <Button
          segmented
          segmentedStrong={selected}
          raised
          className="capitalize min-w-[120px]"
        >
          {label}
        </Button>
      )}
    </Tab>
  );
};

export default function AccountsPageIndex() {
  let { data: user } = trpc.useQuery(["user.me"]);
  // user = null
  return (
    <FrontPageLayout title="My Accounts" requireAuth>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/12 flex flex-col items-center">
          <SidebarUserMenu />
        </div>
        <div className="relative min-h-[480px] w-full lg:w-9/12">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-[1.5rem] tracking-wide font-black mb-4">
            <FaCogs size={32} />
            <h3>Settings</h3>
          </div>
          <Tab.Group as="div" className={"bg-transparent shadow-md pt-0 pb-4"}>
            <Tab.List
              className={
                "flex w-full pb-2 mb-2 overflow-x-auto whitespace-nowrap"
              }
            >
              <TabBtn label="Personal Profile" />
              <TabBtn label="Address List" />
              <TabBtn label="Bank accounts" />
              <TabBtn label="Notification" />
              <TabBtn label="Others" />
            </Tab.List>
            <Tab.Panels className={"mx-4"}>
              <Tab.Panel className="flex flex-col gap-4 font-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
                  <ListSkeleton size={4} className="w-full h-full !m-0" />
                </div>
              </Tab.Panel>
              <Tab.Panel className="flex flex-col gap-4 font-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
                  <ListSkeleton size={4} className="w-full h-full !m-0" />
                </div>
              </Tab.Panel>
              <Tab.Panel className="flex flex-col gap-4 font-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
                  <ListSkeleton size={4} className="w-full h-full !m-0" />
                </div>
              </Tab.Panel>
              <Tab.Panel className="flex flex-col gap-4 font-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
                  <ListSkeleton size={4} className="w-full h-full !m-0" />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </FrontPageLayout>
  );
}

AccountsPageIndex.protected = true;
