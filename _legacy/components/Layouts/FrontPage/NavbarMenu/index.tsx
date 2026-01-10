import FrontPageNavbarMenuAuth from "./Auth";
import FrontPageNavbarMenuCart from "./Cart";
import FrontPageNavbarMenuMessage from "./Message";
import FrontPageNavbarMenuUser from "./User";

export default function FrontPageNavbarMenu({ session }) {
  return (
    <>
      {/* Vertical Divider */}
      <hr className="hidden lg:block w-[1px] h-8 bg-gray-200 dark:bg-bars-ios-dark" />
      {/* Regular Menu Icon */}
      <div className="hidden lg:relative lg:flex lg:gap-2 text-sm items-center">
        {session.status === "authenticated" ? (
          <>
            <FrontPageNavbarMenuCart session={session} />
            <FrontPageNavbarMenuMessage session={session} />
            <FrontPageNavbarMenuUser session={session} />
          </>
        ) : (
          <FrontPageNavbarMenuAuth />
        )}
      </div>
    </>
  );
}
