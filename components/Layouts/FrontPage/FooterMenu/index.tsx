import clsx from "clsx";
import { Tabbar, TabbarLink } from "konsta/react";
import { forwardRef, HTMLProps, useState } from "react";
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
  const { className } = props;
  const [activeTab, setActiveTab] = useState(11);
  return (
    <div ref={ref} className={clsx("", className)}>
      <Tabbar className="inset-x-0 bottom-0 fixed">
        <TabbarLink
          active={activeTab === 11}
          onClick={() => setActiveTab(11)}
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
          onClick={() => setActiveTab(44)}
          label={<HiOutlineUserCircle size={24} />}
        />
      </Tabbar>
    </div>
  );
});

export default FrontPageFooterMenu;