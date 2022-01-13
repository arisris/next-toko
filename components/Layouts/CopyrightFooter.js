import clsx from "clsx";
import Link from "next/link";

export default function CopyrightFooter({ className = "" }) {
  return (
    <div
      className={clsx(
        "col-span-12 lg:col-span-6 flex gap-2 items-center",
        className
      )}
    >
      <span>Copyright &copy;</span>
      <Link href="/">
        <a className="hover:text-green-600 hover:underline text-green-500">
          Super Toko
        </a>
      </Link>
      <span>2022, All rights reserved.</span>
    </div>
  );
}
