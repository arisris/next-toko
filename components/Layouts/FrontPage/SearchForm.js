import SVGRaw from "@/components/Icon/SVGRaw";
import Overlays from "@/components/Overlays";
import { Transition } from "@headlessui/react";
import { useKeyPress, useClickAway } from "ahooks";
import clsx from "clsx";
import Link from "next/link";
import { useRef, useState } from "react";

export default function FrontPageSearchForm() {
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const ref = useRef();
  /** @type {import('react').MutableRefObject<HTMLInputElement>} */
  const inputRef = useRef();
  const [focus, setFocus] = useState(false);

  useClickAway(() => setFocus(false), [ref]);
  useKeyPress(
    "/",
    (e) =>
      !focus && (e.preventDefault(), setFocus(true), inputRef.current.focus())
  );
  useKeyPress(
    "Escape",
    (e) =>
      focus && (e.preventDefault(), setFocus(false), inputRef.current.blur())
  );

  return (
    <>
      {/* Overlays */}
      <Overlays show={focus} shouldFocus className="z-10" />
      {/* Search form */}
      <div
        className={clsx("w-full p-2", {
          "absolute top-0 md:bg-auto md:relative z-20": focus,
          relative: !focus
        })}
      >
        <form ref={ref} method="GET" action="/search">
          <div className={clsx("relative z-10", focus && " ")}>
            <input
              ref={inputRef}
              type="search"
              name="q"
              className="form-input pl-2 pr-7 py-2 w-full text-xs bg-transparent border-gray-200 focus:ring-0 focus:border-gray-300"
              placeholder="Type a product keywords"
              onFocus={() => setFocus(true)}
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setFocus(true);
                } else {
                  setFocus(false);
                }
              }}
            />
            <button type="submit" className="absolute top-1 right-1 p-1">
              <SVGRaw
                className="w-4 h-4"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </button>
          </div>
          <Transition
            className={clsx(
              "absolute w-full inset-x-0 top-0 p-2 pt-14 shadow-xl bg-white text-xs rounded-md"
            )}
            enter={"transition duration-150 ease-in"}
            enterFrom={"opacity-0 scale-95 -translate-y-5"}
            enterTo={"opacity-100 scale-100 translate-y-0"}
            leave={"transition duration-150 ease-out"}
            leaveFrom={"opacity-100 scale-100 translate-y-0"}
            leaveTo={"opacity-0 scale-0 md:scale-95 md:-translate-y-5"}
            show={focus}
          >
            <div
              className={clsx(
                "flex text-xs mt-1 gap-2 overflow-x-auto flex-nowrap scrollbar scrollbar-2 mb-4"
              )}
            >
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <Link key={i} href={`/search?q=${i}`}>
                    <a className="hover:underline whitespace-nowrap">
                      Product {i}
                    </a>
                  </Link>
                ))}
            </div>
            {[0].map((i) => (
              <Link key={i} href={`/search?q=${i}`}>
                <a className="block min-w-full p-2 border-b font-semibold hover:bg-gray-50 hover:underline">
                  Search product {i}
                </a>
              </Link>
            ))}
          </Transition>
        </form>
      </div>
    </>
  );
}
