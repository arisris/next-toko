import SVGRaw from "@/components/Icon/SVGRaw";
import { NavbarMenu } from "@/components/Menu/NavbarMenu";
import { SessionContextValue } from "next-auth/react";
import { FaCartPlus, FaComments } from "react-icons/fa";

export default function FrontPageNavbarMenuMessage({ session }: { session: SessionContextValue}) {
  return (
    <NavbarMenu
      button={
        <button type="button" className="hover:bg-gray-100 p-1">
          <FaComments size={24} />
        </button>
      }
    >
      <div className="absolute inset-0 flex flex-col gap-2 justify-center items-center">
        <div className="text-primary">
          <FaCartPlus size={48} />
        </div>
        <div className="font-bold bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">No Message</div>
      </div>
    </NavbarMenu>
  );
}
