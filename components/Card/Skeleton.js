import clsx from 'clsx';
import { useEffect, useState } from 'react';

/**
 *
 * @param {{ animate: "ping" | "pulse" show: boolean, className: string, children: import("react").ReactChildren, props: {[key]: any } }} param0
 */
export default function Skeleton({
  animate = 'pulse',
  show = true,
  className,
  loadingChildren,
  children,
  ...props
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return mounted ? (
    show ? (
      <div
        aria-label="/* Loading Skeleton */"
        className={clsx(
          'p-2 rounded-md bg-gray-300 cursor-wait',
          {
            'animate-ping': animate === 'ping',
            'animate-pulse': animate === 'pulse'
          },
          className
        )}
        {...props}
      >
        {loadingChildren}
      </div>
    ) : (
      children || null
    )
  ) : (
    children || null
  );
}
