import SVGRaw from "@/components/Icon/SVGRaw";
import { NavbarMenu } from "@/components/Menu/NavbarMenu";
import { Button } from "konsta/react";
import { SessionContextValue } from "next-auth/react";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";

export default function FrontPageNavbarMenuCart({ session }: { session: SessionContextValue}) {
  return (
    <NavbarMenu
      button={
        <Button clear inline>
          <FaShoppingCart size={24} />
        </Button>
      }
    >
      <div className="absolute inset-0 flex flex-col gap-2 justify-center items-center">
        <div className="text-primary dark:text-bars-material-light">
          <FaCartPlus size={48} />
        </div>
        <div className="font-bold bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">Your Cart Is Empty</div>
      </div>
    </NavbarMenu>
  );
}
