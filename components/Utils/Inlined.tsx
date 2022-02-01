import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function Inlined(
  props: PropsWithChildren<{ className?: string }>
) {
  return (
    <div className={clsx("flex gap-2 items-center", props.className)}>
      {props.children}
    </div>
  );
}
