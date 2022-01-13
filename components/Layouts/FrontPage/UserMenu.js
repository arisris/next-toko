import SVGRaw from "@/components/Icon/SVGRaw";
import { signOut } from "next-auth/react";
import { NavbarMenu, NavbarMenuItem } from "@/components/Menu/NavbarMenu";

/**
 * @param {{session: import("next-auth/react").SessionContextValue}} param0 
 */
export default function FrontPageUserMenu({ session }) {
  const { data: sessionData } = session;
  return (
    <NavbarMenu
      button={
        sessionData?.user?.image ? (
          <>
            <img
              src={sessionData.user.image}
              className="w-6 h-6 rounded-full"
            />
            <strong className="truncate">{sessionData.user.name}</strong>
          </>
        ) : (
          <SVGRaw d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        )
      }
    >
      {sessionData?.user?.name && (
        <>
          <div className="p-3">
            <span>Wellcome Back</span> <strong>{sessionData.user.name}!</strong>
          </div>
          <hr />
        </>
      )}
      <NavbarMenuItem text="My account" href="#" />
      <NavbarMenuItem text="Settings" href="#" />
      <hr className="my-2" />
      <a
        href="#logout"
        onClick={(e) => (e.preventDefault(), signOut())}
        className="block px-3 py-2 hover:transition-all hover:pl-5 hover:bg-gray-100"
      >
        Logout
      </a>
    </NavbarMenu>
  );
}
