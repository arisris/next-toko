import { Disclosure } from "@headlessui/react";
import { PropsOf } from "@headlessui/react/dist/types";
import clsx from "clsx";
import { List, ListItem } from "konsta/react";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { FaChevronDown } from "react-icons/fa";
import ListSkeleton from "../Skeleton/ListSkeleton";

export interface NestedListMenuItemProps extends PropsOf<typeof ListItem> {
  defaultOpen?: boolean;
  subMenu?: NestedListMenuItemProps[];
}

export function NestedListMenuItem(props: NestedListMenuItemProps) {
  const { subMenu, defaultOpen, ...otherProps } = props;
  return subMenu ? (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button
            as={ListItem}
            hairlines={false}
            {...otherProps}
            link
            chevronIcon={
              <i
                className={clsx(
                  "transition-transform duration-300 text-primary",
                  !open && "-rotate-90"
                )}
              >
                <FaChevronDown />
              </i>
            }
          />
          <Disclosure.Panel as={List} hairlines={false} className="pl-2" nested>
            {subMenu.map((item, key) => (
              <NestedListMenuItem key={key} {...item} />
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ) : (
    <ListItem menuListItem={true} link={!!otherProps.href} {...otherProps} />
  );
}

export function NestedListMenu(
  props: PropsWithChildren<{
    isLoading?: boolean;
    skeletonSize?: number;
    data: NestedListMenuItemProps[];
  }> = { isLoading: false, data: [] }
) {
  return !props.isLoading ? (
    <List className="!my-0 !-mx-4 border-t pt-4" hairlines={false}>
      {props.data.map((item, key) => (
        <NestedListMenuItem key={key} {...item} />
      ))}
    </List>
  ) : (
    <>
      <div className="mt-4 border-t" />
      <ListSkeleton
        size={props.skeletonSize || 3}
        className="w-full h-full !mx-0 !my-4 !p-4"
      />
    </>
  );
}

export default NestedListMenu;
