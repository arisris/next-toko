import clsx from "clsx";
import { HTMLProps, ReactNode } from "react";

export type SkeletonProps = {
	as?: string;
	animate?: "ping" | "pulse";
	show?: boolean;
	className?: string;
	children?: ReactNode;
	loadingChildren?: JSX.Element | JSX.Element[];
};

export default function Skeleton({
	animate = "pulse",
	show = true,
	className,
	loadingChildren,
	children,
	...props
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
}: SkeletonProps & HTMLProps<HTMLDivElement>): any {
	return show ? (
		<div
			className={clsx(
				"p-2 rounded-md bg-gray-300 dark:bg-bars-material-dark cursor-wait",
				{
					"animate-ping": animate === "ping",
					"animate-pulse": animate === "pulse",
				},
				className,
			)}
			{...props}
		>
			{loadingChildren}
		</div>
	) : (
		children || null
	);
}
