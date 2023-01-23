import SVGRaw from "@/components/Icon/SVGRaw";
import { useUpdateEffect, useKeyPress } from "ahooks";
import clsx from "clsx";
import { Button } from "konsta/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function FrontPageCategoriesMenu(props: {
  isNavHidden?: boolean;
}) {
  const ref = useRef<HTMLDivElement>();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    if (open) {
      ref.current!.classList.add("p-0", "opacity-0");
      let t = setTimeout(() => {
        setOpen(false);
        document.body.classList.remove("overflow-hidden");
        clearTimeout(t);
      }, 300);
    } else {
      document.body.classList.add("overflow-hidden");
      setOpen(true);
    }
  };
  useKeyPress("Escape", () => (open ? handleToggle() : null));
  useUpdateEffect(() => {
    if (open) {
      router.events.on("hashChangeStart", handleToggle);
      return () => router.events.off("routeChangeStart", handleToggle);
    }
  }, [router.asPath]);

  return (
    <div
      // @ts-expect-error
      ref={ref}
      className={clsx(
        "flex lg:items-center lg:bg-none lg:p-0 lg:relative lg:h-auto",
        {
          "absolute inset-0 z-20 bg-gradient-to-b from-gray-300 to-white dark:from-block-strong-dark dark:to-black h-screen flex-col py-20 px-10 transition-all duration-300":
            open
        }
      )}
    >
      <Button
        className={clsx("lg:hidden", {
          "self-end": open
        })}
        onClick={handleToggle}
        clear
        inline
      >
        <SVGRaw d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
      </Button>
      <div
        className={clsx("lg:flex flex-col lg:flex-row lg:gap-4 text-sm", {
          flex: open,
          hidden: !open
        })}
      >
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Link key={`key${i}`} href={`/cat/${i}`}>
              <Button
                inline
                clear
                className="capitalize"
                colors={{
                  textIos:
                    "text-bars-material-dark dark:text-bars-material-light"
                }}
              >
                Menu {i}
              </Button>
            </Link>
          ))}
      </div>
    </div>
  );
}
