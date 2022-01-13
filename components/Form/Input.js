import clsx from "clsx";
import { useState } from "react";

/** */
export default function FormInput({
  className = "",
  type = "text",
  label = "",
  onFocus = () => {},
  onBlur = () => {},
  ...props
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={clsx(
        "relative w-full rounded border-2 z-0",
        {
          "border-green-300": focus
        },
        className
      )}
    >
      <input
        type={type}
        className="relative p-3 w-full h-full bg-transparent outline-none z-10"
        onFocus={(e) => (setFocus(true), onFocus(e))}
        onBlur={(e) => (setFocus(false), onBlur(e))}
        {...props}
      />
      {label && (
        <span
          className={clsx("absolute left-3 transition-all text-sm", {
            "top-3 text-opacity-50": !focus,
            "-top-2.5 text-xs px-1 py-[1px] bg-green-600 text-white rounded !z-20":
              focus
          })}
        >
          {label}
        </span>
      )}
    </div>
  );
}
