import SVGRaw from "@/components/Icon/SVGRaw";
import { NavbarMenu } from "@/components/Menu/NavbarMenu";
import { SessionContextValue } from "next-auth/react";
import { FaCartPlus } from "react-icons/fa";

export default function FrontPageNavbarMenuCart({ session }: { session: SessionContextValue}) {
  return (
    <NavbarMenu
      button={
        <button type="button" className="hover:bg-gray-100 p-1">
          <SVGRaw d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </button>
      }
    >
      <div className="absolute inset-0 flex flex-col gap-2 justify-center items-center">
        <div className="text-primary">
          <FaCartPlus size={48} />
        </div>
        <div className="font-bold bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">Your Cart Is Empty</div>
      </div>
    </NavbarMenu>
  );
}
