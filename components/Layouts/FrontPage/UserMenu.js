import SVGRaw from "@/components/Icon/SVGRaw";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import { signOut, useSession } from "next-auth/react";

const MenuItem = ({ text, href }) => {
  return (
    <Menu.Item>
      <Link href={href}>
        <a
          className={clsx(
            "block px-3 py-2 hover:transition-all hover:pl-5 hover:bg-gray-100",
            {}
          )}
        >
          {text}
        </a>
      </Link>
    </Menu.Item>
  );
};

export default function FrontPageUserMenu(props) {
  const { data: sessionData } = useSession();
  return (
    <>
      <button type="button" className="hover:bg-gray-100 p-1">
        <SVGRaw d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </button>
      <Menu as="div" className="relative">
        <Menu.Button
          as="div"
          role="button"
          className="inline-flex gap-1 items-center hover:bg-gray-100 p-1 cursor-pointer select-none"
        >
          {sessionData?.user?.image ? (
            <>
              <img
                src={sessionData.user.image}
                className="w-6 h-6 rounded-full"
              />
              <strong className="truncate">{sessionData.user.name}</strong>
            </>
          ) : (
            <SVGRaw d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          )}
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
          <Menu.Items className="absolute right-0 min-w-[14rem] mt-2 py-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {sessionData?.user?.name && (
              <>
                <div className="p-3">
                  <span>Wellcome Back</span>{" "}
                  <strong>{sessionData.user.name}!</strong>
                </div>
                <hr />
              </>
            )}
            <MenuItem text="My account" href="#" />
            <MenuItem text="Settings" href="#" />
            <hr className="my-2" />
            <a
              href="#logout"
              onClick={(e) => (e.preventDefault(), signOut())}
              className="block px-3 py-2 hover:transition-all hover:pl-5 hover:bg-gray-100"
            >
              Logout
            </a>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
