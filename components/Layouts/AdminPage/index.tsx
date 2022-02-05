import { useResponsive } from "ahooks";
import clsx from "clsx";
import NextLink from "next/link";
import { Link, Navbar, Page, Panel, Popover } from "konsta/react";
import { useSession } from "next-auth/react";
import { PropsWithChildren, useRef, useState } from "react";
import {
  MdAdd,
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdMenuBook,
  MdNightlight,
  MdNotifications,
  MdViewDay
} from "react-icons/md";
import SidebarAdminMenu from "./NavbarMenu";
import AdminPageNotificationsMenu from "./NavbarMenu/Notifications";
import AdminPageHelpMenu from "./NavbarMenu/HelpMenu";
import { useDarkMode } from "@/lib/hooks/useDarkMode";

export default function AdminPageLayout(props: PropsWithChildren<{}>) {
  const session = useSession();
  const [opened, setOpened] = useState(false);
  // notifications menu
  const [notificationsMenuOpened, setNotificationsMenuOpened] = useState(false);
  const notificationsMenuTargetRef = useRef(null);
  const openNotificationsMenu = (target) => {
    notificationsMenuTargetRef.current = target;
    setNotificationsMenuOpened(true);
  };
  // help menu
  const [helpMenuOpened, setHelpMenuOpened] = useState(false);
  const helpMenuTargetRef = useRef(null);
  const openHelpMenu = (target) => {
    helpMenuTargetRef.current = target;
    setHelpMenuOpened(true);
  };
  const screen = useResponsive();
  const darkMode = useDarkMode();
  return (
    <Page>
      <Navbar
        // @ts-expect-error
        title={
          <NextLink href="/admin">
            <Link component="a">
              <span className="-ml-6 lg:ml-0 fill-current text-[20px] tracking-wide bg-gradient-to-r from-blue-900 via-primary to-blue-900 bg-clip-text text-transparent px-4 py-1">
                NextToko
              </span>
            </Link>
          </NextLink>
        }
        left={
          <Link
            navbar
            iconOnly
            onClick={() => setOpened(true)}
            className="lg:hidden"
          >
            <MdMenu size={28} />
          </Link>
        }
        right={
          <div className="xl:mr-4">
            <Link
              navbar
              iconOnly
              className="notifications-menu-ref"
              onClick={() => openNotificationsMenu(".notifications-menu-ref")}
            >
              <MdNotifications size={28} />
            </Link>
            <Link
              navbar
              iconOnly
              className="help-menu-ref"
              onClick={() => openNotificationsMenu(".help-menu-ref")}
            >
              <MdMenuBook size={28} />
            </Link>
            <Link navbar iconOnly onClick={() => darkMode.toggle()}>
              {darkMode.dark ? (
                <MdLightMode size={28} />
              ) : (
                <MdDarkMode size={28} />
              )}
            </Link>
          </div>
        }
      />
      <Popover
        opened={notificationsMenuOpened}
        target={notificationsMenuTargetRef.current}
        onBackdropClick={() => setNotificationsMenuOpened(false)}
      >
        <AdminPageNotificationsMenu />
      </Popover>
      <Popover
        opened={helpMenuOpened}
        target={helpMenuTargetRef.current}
        onBackdropClick={() => setHelpMenuOpened(false)}
      >
        <AdminPageHelpMenu />
      </Popover>
      <div className="flex flex-col-reverse lg:flex-row gap-6">
        <div className="relative">
          {screen.lg ? (
            <div
              className={clsx(
                "hidden lg:block lg:w-[300px] h-full border-r-2 bg-block-strong-light dark:bg-block-strong-dark"
              )}
            >
              <SidebarAdminMenu />
            </div>
          ) : (
            <Panel
              side="left"
              opened={opened}
              onBackdropClick={() => setOpened(false)}
              size="w-72 min-h-screen overflow-y-auto"
              colors={{
                bg: "bg-block-strong-light dark:bg-block-strong-dark"
              }}
            >
              <SidebarAdminMenu />
            </Panel>
          )}
        </div>
        <div className="relative lg:min-h-[98vh] mt-4">{props.children}</div>
      </div>
    </Page>
  );
}
