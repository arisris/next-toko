import SVGRaw from "@/components/Icon/SVGRaw";
import FrontPageLayout from "@/components/Layouts/FrontPage";
import Inlined from "@/components/Utils/Inlined";
import { useResponsive } from "ahooks";
import { Button, Page, Panel } from "konsta/react";
import { PropsWithChildren, ReactElement, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import SidebarUserMenu from "./SidebarUserMenu";

export default function UserLayout(
  props: PropsWithChildren<{ title?: string; icon?: ReactElement<IconType> }>
) {
  const [opened, setOpened] = useState(false);
  const screen = useResponsive();
  return (
    <FrontPageLayout title={props.title || "User Dashboard"} requireAuth>
      <div className="flex flex-col-reverse lg:flex-row gap-6">
        <div className="w-full lg:w-3/12 flex flex-col items-center">
          {screen.lg ? (
            <SidebarUserMenu />
          ) : (
            <Panel
              side="left"
              opened={opened}
              onBackdropClick={() => setOpened(false)}
              size="w-72 min-h-screen overflow-y-auto"
              colors={{
                bg: "bg-block-strong-light dark:bg-block-strong-dark"
              }}
            >
              <SidebarUserMenu className="ml-[-2px] mr-1 !-my-1" />
            </Panel>
          )}
        </div>
        <div className="relative lg:min-h-[480px] w-full lg:w-9/12">
          {props.title && (
            <Inlined className="mx-4 justify-between lg:mx-0 gap-2 mb-4">
              <Inlined className="text-[1.5rem] tracking-wide font-black">
                {props.icon || null} <span>{props.title}</span>
              </Inlined>
              <Inlined className="relative z-0">
                <Button
                  className="lg:hidden"
                  onClick={() => setOpened(true)}
                  clear
                >
                  <SVGRaw
                    d={
                      opened
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </Button>
              </Inlined>
            </Inlined>
          )}
          {props.children}
        </div>
      </div>
    </FrontPageLayout>
  );
}
