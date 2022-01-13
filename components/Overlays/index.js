import { Transition } from "@headlessui/react";
import { useUpdateEffect } from "ahooks";
import clsx from "clsx";

/**
 *
 * @param {{ show: boolean, className: string, shouldFocus: boolean }} param0
 * @returns
 */
export default function Overlays({
  show = false,
  className,
  shouldFocus = false
}) {
  useUpdateEffect(() => {
    if (shouldFocus) {
      let clz = ["overflow-hidden"];
      if (show) {
        document.body.classList.add(...clz);
      } else {
        document.body.classList.remove(...clz);
      }
    }
  }, [show]);
  return (
    <Transition
      show={show}
      className={clsx("absolute min-w-screen min-h-screen inset-0 translucent", className)}
      enter={"transition duration-300"}
      enterFrom={"bg-black opacity-0"}
      enterTo={"bg-black opacity-30"}
      entered={"bg-black opacity-30"}
      leave={"transition duration-300"}
      leaveFrom={"bg-black opacity-30"}
      leaveTo={"bg-black opacity-0"}
    />
  );
}
