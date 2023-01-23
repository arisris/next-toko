import { noop } from "@/lib/utils";
import clsx from "clsx";
import { HTMLProps } from "react";
import { forwardRef, useState } from "react";

const TextInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    const {
      className = "",
      type = "text",
      label = "",
      onFocus = noop,
      onBlur = noop,
      onChange = noop,
      ...rest
    } = props;
    const [focus, setFocus] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const handleChange = (e) => {
      if (e.target.value.length !== 0) {
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
      return onChange(e);
    };
    return (
      <div
        className={clsx(
          "relative w-full rounded border-2 z-0",
          {
            "border-primary": focus
          },
          className
        )}
      >
        <input
          ref={ref}
          type={type}
          className="relative p-3 w-full h-full bg-transparent outline-none z-10"
          onFocus={(e) => (setFocus(true), onFocus(e))}
          onBlur={(e) => (setFocus(false), onBlur(e))}
          onChange={handleChange}
          {...rest}
        />
        {label && (
          <span
            className={clsx(
              "absolute left-3 transition-all text-sm",
              {
                "top-2.5": !focus,
                "-top-2.5 text-xs px-1 py-[1px] bg-primary text-white rounded !z-20":
                  focus
              },
              !(focus || isEmpty ) && "opacity-0"
            )}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);
export default TextInput;
