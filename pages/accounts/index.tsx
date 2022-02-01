import clsx from "clsx";
import ListSkeleton from "@/components/Skeleton/ListSkeleton";
import { Tab } from "@headlessui/react";
import { Button } from "konsta/react";
import UserLayout from "@/components/User/Layouts";
import { FaCogs } from "react-icons/fa";

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
          className="capitalize min-w-[120px] px-8"
        >
          {label}
        </Button>
      )}
    </Tab>
  );
};

export default function AccountsPageIndex() {
  return (
    <UserLayout title="Account Settings" icon={<FaCogs size={32} />}>
      <Tab.Group as="div" className={"bg-transparent shadow-md pt-0 pb-4"}>
        <Tab.List
          className={"flex w-full pb-2 mb-2 overflow-x-auto whitespace-nowrap"}
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
    </UserLayout>
  );
}

AccountsPageIndex.protected = true;
