import Skeleton from "./Skeleton";
import { fakeArray } from "@/lib/utils";
import clsx from "clsx";

export default function ListSkeleton(props: {
  size?: number;
  className?: string;
}) {
  return (
    <>
      {fakeArray(props.size).map((i, k) => (
        <Skeleton
          key={k}
          className={clsx("p-2 m-2", props.className)}
        />
      ))}
    </>
  );
}
