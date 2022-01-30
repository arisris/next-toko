import Skeleton from "@/components/Skeleton/Skeleton";
import ListSkeleton from "@/components/Skeleton/ListSkeleton";
import FrontPageLayout from "components/Layouts/FrontPage";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { trpc } from "@/lib/trpc";

const TabBtn = ({ label = "", disabled = false }) => (
  <Tab
    className={({ selected }) =>
      clsx("w-full p-2 transition-all", {
        "border-b-[3px] border-primary bg-gray-200": selected,
        "border-b-[3px] border-transparent": !selected
      })
    }
    disabled={disabled}
  >
    {label}
  </Tab>
);

export default function AccountsPageIndex() {
  const { data: user } = trpc.useQuery(["user.me"]);

  return (
    <FrontPageLayout title="My Accounts" requireAuth>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/12 flex flex-col items-center">
          
          {/* <Skeleton className="w-32 h-32 rounded-full m-2" />
          <ListSkeleton size={6} className="p-4 w-[98%] md:w-[80%]" /> */}
        </div>
        <div className="relative min-h-[480px] w-full md:w-9/12 bg-transparent border shadow pt-0 pb-2">
          <Tab.Group>
            <Tab.List
              className={
                "flex w-full pb-2 mb-4 overflow-x-auto whitespace-nowrap"
              }
            >
              <TabBtn label="Profile" />
              <TabBtn label="Settings" />
              <TabBtn label="Payments" />
              <TabBtn label="Bank Accounts" />
              <TabBtn label="Two Factor" />
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <Skeleton className="w-64 h-8 mb-8 mx-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-64 px-4">
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
