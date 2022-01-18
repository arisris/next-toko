import clsx from "clsx";
import { ReactChild } from "react";
import { HTMLProps, ReactNode, useEffect, useState } from "react";

export default function Skeleton({
  animate = "pulse",
  show = true,
  className,
  loadingChildren,
  children,
  ...props
}: {
  animate?: "ping" | "pulse";
  show?: boolean;
  className?: string;
  children?: any;
  loadingChildren?: any;
} & HTMLProps<HTMLDivElement>)  {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return mounted ? (
    show ? (
      <div
        aria-label="/* Loading Skeleton */"
        className={clsx(
          "p-2 rounded-md bg-gray-300 cursor-wait",
          {
            "animate-ping": animate === "ping",
            "animate-pulse": animate === "pulse"
          },
          className
        )}
        {...props}
      >
        {loadingChildren}
      </div>
    ) : (
      <>{children || null}</>
    )
  ) : (
    <>{children || null}</>
  );
}
