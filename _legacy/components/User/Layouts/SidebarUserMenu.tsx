import NestedListMenu, {
	NestedListMenuItemProps,
} from "@/components/Menu/NestedListMenu";
import Skeleton from "@/components/Skeleton/Skeleton";
import { trpc } from "@/lib/trpc";
import clsx from "clsx";
import { Card, List, ListItem } from "konsta/react";
import Image from "next/image";
import { FaCheck, FaMoneyBill } from "react-icons/fa";

const menuData: NestedListMenuItemProps[] = [
	{
		title: "Inbox",
		defaultOpen: true,
		subMenu: [
			{
				title: "Chat 1",
				subMenu: [
					{
						title: "Chat 2",
						subMenu: [
							{
								title: "Chat 3",
								subMenu: [
									{
										title: "Chat 4",
									},
									{
										title: "Item No Sub",
									},
								],
							},
							{
								title: "Item No Sub",
							},
						],
					},
					{
						title: "Item No Sub",
					},
				],
			},
			{
				title: "Product Discussion",
			},
			{
				title: "Review",
			},
			{
				title: "Help Support",
			},
			{
				title: "Complain",
			},
			{
				title: "Update",
			},
		],
	},
	{
		title: "Purchase",
		subMenu: [
			{
				title: "Waiting Payment",
			},
			{
				title: "Transaction List",
			},
		],
	},
	{
		title: "My Profile",
		subMenu: [
			{
				title: "Wishlist",
			},
			{
				title: "Store Favorite",
			},
			{
				title: "Settings",
			},
		],
	},
];

export default function SidebarUserMenu(props: { className?: string }) {
	const { data: user } = trpc.useQuery(["user.me", ["email"]]);
	return (
		<Card className={clsx("relative z-0 w-full h-full m-0", props.className)}>
			{user ? (
				<List className="!my-0">
					<ListItem
						media={
							<Image
								src={user.image}
								width="64"
								height="64"
								className="rounded-full"
								priority
								alt={""}
							/>
						}
						title={user.name}
						subtitle={
							<div className="flex gap-2 items-center">
								<span className="text-xs text-gray-500 dark:text-gray-100">
									Verified Accounts
								</span>
								<FaCheck className="text-primary" />
							</div>
						}
					/>
					<ListItem
						media={<FaMoneyBill size={28} />}
						mediaClassName="text-primary -mr-1"
						strongTitle
						title="Saldo"
						titleWrapClassName="text-xl tracking-wide"
					/>
					<ListItem title="Sisa Saldo" after={<span>RP. 520.105</span>} />
				</List>
			) : (
				<div className="flex gap-2 items-center">
					<Skeleton className="w-14 h-14 rounded-full m-2" />
					<Skeleton className="w-[60%] h-14 rounded m-2" />
				</div>
			)}
			<NestedListMenu isLoading={!user} data={menuData} skeletonSize={10} />
		</Card>
	);
}
