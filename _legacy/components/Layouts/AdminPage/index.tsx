import { useResponsive } from "ahooks";
import clsx from "clsx";
import NextLink from "next/link";
import { Link, Navbar, Page, Panel, Popover } from "konsta/react";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import {
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdMenuBook,
  MdNotifications
} from "react-icons/md";
import SidebarAdminMenu from "./NavbarMenu";
import AdminPageNotificationsMenu from "./NavbarMenu/Notifications";
import AdminPageHelpMenu from "./NavbarMenu/HelpMenu";
import { useDarkMode } from "@/lib/hooks/useDarkMode";
import Inlined from "@/components/Utils/Inlined";
import Head from "next/head";

export default function AdminPageLayout(
  props: PropsWithChildren<{
    title?: string;
    icon?: ReactNode;
  }>
) {
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
    <>
      <Head>
        <title>{props.title || "Admin Panel"} - NextToko</title>
      </Head>
      <Page className="max-w-full">
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
            <div className="lg:mr-4">
              <Link
                navbar
                iconOnly
                className="notifications-menu-ref"
                onClick={() => openNotificationsMenu(".notifications-menu-ref")}
              >
                <MdNotifications size={28} />
              </Link>
              {/* <Link
                navbar
                iconOnly
                className="help-menu-ref"
                onClick={() => openNotificationsMenu(".help-menu-ref")}
              >
                <MdMenuBook size={28} />
              </Link> */}
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
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative w-full lg:w-[30%] 2xl:w-[27%]">
            {screen?.lg ? (
              <div
                className={clsx(
                  "fixed hidden lg:block xl:w-[300px] h-full overflow-y-auto scrollbar dark:scrollbar-gray-900 bg-block-strong-light dark:bg-block-strong-dark"
                )}
              >
                {/* {fakeArray(100).map(i => <p>Hello {i}</p>)} */}
                <SidebarAdminMenu />
                {/* This is trick */}
                <p className="mb-16" />
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
          <div className="relative w-full lg:py-4 lg:pl-0 lg:pr-8">
            {props.title && (
              <Inlined className="mx-4 justify-between lg:mx-0 gap-2 mb-4">
                <Inlined className="text-[1.5rem] tracking-wide font-black">
                  {props.icon || null} <span>{props.title}</span>
                </Inlined>
                <Inlined className="relative z-0">Right</Inlined>
              </Inlined>
            )}
            {props.children}
          </div>
        </div>
      </Page>
    </>
  );
}
