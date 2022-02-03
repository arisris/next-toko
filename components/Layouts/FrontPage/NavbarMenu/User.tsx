import SVGRaw from "@/components/Icon/SVGRaw";
import { SessionContextValue, signOut } from "next-auth/react";
import { NavbarMenu, NavbarMenuItem } from "@/components/Menu/NavbarMenu";
import { Button, Link } from "konsta/react";

export default function FrontPageNavbarMenuUser({
  session
}: {
  session: SessionContextValue;
}) {
  const { data: sessionData } = session;
  return (
    <NavbarMenu
      button={
        sessionData?.user?.image ? (
          <Link
            tabbar
            className="p-2 gap-2"
          >
            <img
              src={sessionData.user.image}
              className="w-6 h-6 rounded-full"
            />
            <strong className="hidden lg:inline-flex truncate text-bars-material-dark dark:text-bars-material-light capitalize">
              {sessionData.user.name}
            </strong>
          </Link>
        ) : (
          <Button component="a" clear inline>
            <SVGRaw d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </Button>
        )
      }
    >
      {sessionData?.user?.name && (
        <>
          <div className="flex flex-col items-center justify-center gap-1">
            <p>Wellcome Back!</p>
            <img
              src={sessionData.user.image}
              className="w-14 h-14 rounded-full"
            />
            <strong>{sessionData.user.name}</strong>
          </div>
          <hr />
        </>
      )}
      <NavbarMenuItem text="My account" href="/accounts" />
      <NavbarMenuItem text="Settings" href="#" />
      <hr className="my-2" />
      <a
        href="#signOut"
        onClick={(e) => (e.preventDefault(), signOut())}
        className="block px-3 py-2 hover:transition-all hover:pl-5 hover:bg-gray-100 dark:hover:bg-bars-ios-dark"
      >
        SignOut
      </a>
    </NavbarMenu>
  );
}
