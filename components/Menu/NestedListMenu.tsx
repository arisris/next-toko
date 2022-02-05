import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { List, ListItem } from "konsta/react";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { FaChevronDown } from "react-icons/fa";
import ListSkeleton from "../Skeleton/ListSkeleton";

export type NestedListMenuItemsType = {
  title: string;
  link?: string;
  defaultOpen?: boolean;
  icon?: IconType | string;
  subMenu?: NestedListMenuItemsType[];
};

export default function NestedListMenu(
  props: PropsWithChildren<{
    isLoading?: boolean;
    skeletonSize?: number;
    data: NestedListMenuItemsType[];
  }> = { isLoading: false, data: [] }
) {
  return !props.isLoading ? (
    <List className="!my-0 !-mx-4 hairline-transparent border-t pt-4">
      {props.data.map((menu, menuIndex) => {
        return menu.subMenu && menu.subMenu.length > 0 ? (
          <Disclosure key={"menu-" + menuIndex} defaultOpen={menu.defaultOpen}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  as={ListItem}
                  media={menu.icon && <menu.icon size={24} />}
                  title={menu.title}
                  link
                  chevronIcon={
                    <i
                      className={clsx(
                        "transition-transform duration-300",
                        open && "rotate-180"
                      )}
                    >
                      <FaChevronDown />
                    </i>
                  }
                />
                <Disclosure.Panel
                  as={List}
                  className="pl-4 hairline-transparent"
                  nested
                >
                  {menu.subMenu.map((i, k) => (
                    <ListItem
                      key={"menu-" + menuIndex + "-submenu-" + k}
                      media={i.icon && <i.icon size={24} />}
                      title={i.title}
                      link
                    />
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ) : (
          <ListItem
            key={"menu-" + menuIndex}
            media={menu.icon && <menu.icon size={24} />}
            title={menu.title}
            link
          />
        );
      })}
    </List>
  ) : (
    <>
      <div className="mt-4 border-t" />
      <ListSkeleton size={props.skeletonSize || 3} className="w-full h-full !mx-0 !my-4 !p-4" />
    </>
  );
}
