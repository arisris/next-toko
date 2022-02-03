import ListSkeleton from "@/components/Skeleton/ListSkeleton";
import Skeleton from "@/components/Skeleton/Skeleton";
import { trpc } from "@/lib/trpc";
import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { Badge, Card, List, ListItem } from "konsta/react";
import Image from "next/image";
import { FaCheck, FaChevronDown, FaMoneyBill } from "react-icons/fa";

export default function SidebarUserMenu(props: { className?: string }) {
  const { data: user } = trpc.useQuery(["user.me"]);
  return (
    <Card className={clsx("relative z-0 w-full h-full m-0", props.className)}>
      {user ? (
        <List className="!my-0" hairlines={false}>
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
                <FaCheck className="text-primary" />
              </div>
            }
          />
          <ListItem
            media={<FaMoneyBill size={28} />}
            mediaClassName="text-primary -mr-1"
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
      {user ? (
        <List className="!my-0 !z-0 hairline-transparent pt-4">
          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button
                  as={ListItem}
                  title="Inbox"
                  link
                  chevronIcon={
                    <i
                      className={clsx(
                        "transition-transform duration-300",
                        open && "rotate-180"
                      )}
                    >
                      <FaChevronDown />
                    </i>
                  }
                />
                <Disclosure.Panel
                  as={List}
                  className="pl-4 hairline-transparent"
                  nested
                >
                  <ListItem title="Chat" link after={<Badge>5</Badge>} />
                  <ListItem title="Product Discussion" link />
                  <ListItem title="Review" link />
                  <ListItem title="Help Support" link />
                  <ListItem title="Complain" link />
                  <ListItem title="Update" link />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  as={ListItem}
                  title="Purchase"
                  link
                  chevronIcon={
                    <i
                      className={clsx(
                        "transition-transform duration-300",
                        open && "rotate-180"
                      )}
                    >
                      <FaChevronDown />
                    </i>
                  }
                />
                <Disclosure.Panel
                  as={List}
                  className="pl-4 hairline-transparent"
                  nested
                >
                  <ListItem title="Waiting Payment" link />
                  <ListItem title="Transaction List" link />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  as={ListItem}
                  title="My Profile"
                  link
                  chevronIcon={
                    <i
                      className={clsx(
                        "transition-transform duration-300",
                        open && "rotate-180"
                      )}
                    >
                      <FaChevronDown />
                    </i>
                  }
                />
                <Disclosure.Panel
                  as={List}
                  className="pl-4 hairline-transparent"
                  nested
                >
                  <ListItem title="Wishlist" link />
                  <ListItem title="Store Favorite" link />
                  <ListItem title="Settings" link />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </List>
      ) : (
        <>
          <div className="mt-4 border-t" />
          <ListSkeleton size={3} className="w-full h-full !mx-0 !my-4 !p-4" />
        </>
      )}
    </Card>
  );
}
