import clsx from "clsx";
import { Tabbar, TabbarLink } from "konsta/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { forwardRef, HTMLProps, useEffect, useState } from "react";
import {
  HiOutlineChatAlt2,
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineUserCircle
} from "react-icons/hi";

const FrontPageFooterMenu = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>((props, ref) => {
  const session = useSession();
  const router = useRouter();
  const { className } = props;
  const [activeTab, setActiveTab] = useState(11);

  useEffect(() => {
    if (router.asPath === "/accounts") {
      setActiveTab(44);
    }
  }, [activeTab, router.asPath]);
  return (
    <div ref={ref} className={clsx("", className)}>
      <Tabbar className="inset-x-0 bottom-0 fixed">
        <TabbarLink
          active={activeTab === 11}
          onClick={() => {
            setActiveTab(11);
            router.push("/");
          }}
          label={<HiOutlineHome size={24} />}
        />
        <TabbarLink
          active={activeTab === 22}
          onClick={() => setActiveTab(22)}
          label={<HiOutlineShoppingCart size={24} />}
        />
        <TabbarLink
          active={activeTab === 33}
          onClick={() => setActiveTab(33)}
          label={<HiOutlineChatAlt2 size={24} />}
        />
        <TabbarLink
          active={activeTab === 44}
          onClick={() => {
            if (session.status !== "authenticated") {
              signIn();
            } else {
              router.push("/accounts");
            }
          }}
          label={<HiOutlineUserCircle size={24} />}
        />
      </Tabbar>
    </div>
  );
});

export default FrontPageFooterMenu;
