import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";

export const NavbarMenuItem = ({ text, href }: { text: any; href: string }) => {
  return (
    <Menu.Item>
      <Link href={href}>
        <a
          className={clsx(
            "block px-3 py-2 hover:transition-all hover:pl-5 hover:bg-gray-100 dark:hover:bg-bars-ios-dark",
            {}
          )}
        >
          {text}
        </a>
      </Link>
    </Menu.Item>
  );
};

export function NavbarMenu(props: {
  button?: any;
  children?: JSX.Element | JSX.Element[];
  menuClass?: string;
}) {
  const { button = "Menu", children, menuClass } = props;
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        as="div"
        role="button"
        className="inline-flex gap-1 items-center hover:bg-gray-100 dark:hover:bg-bars-ios-dark p-1 cursor-pointer select-none"
      >
        {button}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter={"transition duration-150 ease-in"}
        enterFrom={"opacity-0 scale-95"}
        enterTo={"opacity-100 scale-100"}
        leave={"transition duration-150 ease-out"}
        leaveFrom={"opacity-100 scale-100"}
        leaveTo={"opacity-0 scale-95"}
      >
        <Menu.Items
          className={clsx(
            "absolute right-0 min-w-[18rem] min-h-[10rem] mt-2 py-2 origin-top-right bg-popover-light dark:bg-popover-dark divide-y divide-popover-light dark:divide-popover-dark rounded-md shadow-lg ring-1 ring-popover-light dark:ring-popover-dark ring-opacity-5 focus:outline-none",
            menuClass
          )}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
