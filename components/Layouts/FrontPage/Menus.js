import SVGRaw from "@/components/Icon/SVGRaw";
import { useUpdateEffect, useKeyPress } from "ahooks";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

/**
 * @type {import('react').ReactElement}
 * @param {{isNavHidden: boolean}} props
 */
export default function FrontPageCategories(props) {
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const ref = useRef();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    if (open) {
      ref.current.classList.add("p-0", "opacity-0");
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
      ref={ref}
      className={clsx(
        "flex lg:items-center lg:bg-none lg:p-0 lg:relative lg:h-auto",
        {
          "absolute inset-0 z-20 bg-gradient-to-b from-gray-300 to-white h-screen flex-col p-10 transition-all duration-300":
            open
        }
      )}
    >
      <button
        type="button"
        className={clsx("flex lg:hidden p-1", {
          "self-end": open
        })}
        onClick={handleToggle}
      >
        <SVGRaw d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
      </button>
      <div
        className={clsx("lg:flex flex-col lg:flex-row lg:gap-4 text-sm", {
          flex: open,
          hidden: !open
        })}
      >
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Link key={i} href={`/cat/${i}`}>
              <a className="block w-full p-2 border-b lg:border-none whitespace-nowrap">
                Menu {i}
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}
