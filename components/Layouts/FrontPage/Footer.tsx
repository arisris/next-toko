import { useDarkMode } from "@/lib/hooks/useDarkMode";
import clsx from "clsx";
import { Button, Chip } from "konsta/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMap, FaMoon, FaPhone, FaSun } from "react-icons/fa";
import CopyrightFooter from "../CopyrightFooter";

function Menu({ title, className, children }) {
	return (
		<div className={clsx("", className)}>
			<h6 className="text-xl font-medium">{title}</h6>
			{children}
		</div>
	);
}

export default function FrontPageFooter() {
	const [mounted, setMounted] = useState(false);
	const { toggle, dark } = useDarkMode();
	useEffect(() => setMounted(true), []);
	return (
		<div className="grid grid-cols-12 lg:grid-cols-6 gap-8 lg:gap-2 mt-8 px-4 md:px-0">
			<Menu className="col-span-12 lg:col-span-2" title={"Contact US"}>
				<ul className="mt-4 text-sm flex flex-col gap-4">
					<li className="inline-flex gap-2 items-center">
						<FaPhone size={14} className="text-gray-600" />
						<span>+6281-1234-5678</span>
					</li>
					<li className="inline-flex gap-2 items-center">
						<FaEnvelope size={14} className="text-gray-600" />
						<span>admin@example.biz</span>
					</li>
					<li className="inline-flex gap-2 items-center">
						<FaMap size={14} className="text-gray-600" />
						<span>JL. Raya Ageng saksono No.1</span>
					</li>
				</ul>
			</Menu>
			<Menu className="col-span-6 lg:col-span-1" title={"My account"}>
				<ul className="mt-4 text-sm flex flex-col gap-4 tracking-wide">
					<li>
						<Link
							href="/accounts"
							className="hover:text-gray-600 hover:underline"
						>
							Dashboard
						</Link>
					</li>
					<li>
						<Link
							href="/accounts/orders"
							className="hover:text-gray-600 hover:underline"
						>
							My Orders
						</Link>
					</li>
					<li>
						<Link
							href="/accounts/reviews"
							className="hover:text-gray-600 hover:underline"
						>
							My Reviews
						</Link>
					</li>
					<li>
						<Link
							href="/accounts/profile"
							className="hover:text-gray-600 hover:underline"
						>
							My Profile
						</Link>
					</li>
				</ul>
			</Menu>
			<Menu className="col-span-6 lg:col-span-1" title={"Our Services"}>
				<ul className="mt-4 text-sm flex flex-col gap-4 tracking-wide">
					<li>
						<Link
							href="/pages/about-us"
							className="hover:text-gray-600 hover:underline"
						>
							About US
						</Link>
					</li>
					<li>
						<Link
							href="/pages/return-policy"
							className="hover:text-gray-600 hover:underline"
						>
							Return Policy
						</Link>
					</li>
					<li>
						<Link
							href="/pages/faq"
							className="hover:text-gray-600 hover:underline"
						>
							FAQ
						</Link>
					</li>
					<li>
						<Link
							href="/pages/privacy-policy"
							className="hover:text-gray-600 hover:underline"
						>
							Privacy Policy
						</Link>
					</li>
					<li>
						<Link
							href="/pages/terms-of-use"
							className="hover:text-gray-600 hover:underline"
						>
							Terms Of Use
						</Link>
					</li>
				</ul>
			</Menu>
			<Menu className="col-span-6 lg:col-span-1" title={"Information"}>
				<ul className="mt-4 text-sm flex flex-col gap-4 tracking-wide">
					<li>
						<Link href="#" className="hover:text-gray-600 hover:underline">
							New Arrival
						</Link>
					</li>
					<li>
						<Link href="#" className="hover:text-gray-600 hover:underline">
							Specialis
						</Link>
					</li>
					<li>
						<Link href="#" className="hover:text-gray-600 hover:underline">
							Hot Deals
						</Link>
					</li>
					<li>
						<Link href="#" className="hover:text-gray-600 hover:underline">
							Backpacks
						</Link>
					</li>
					<li>
						<Link href="#" className="hover:text-gray-600 hover:underline">
							Men's Fashion
						</Link>
					</li>
				</ul>
			</Menu>
			<Menu className="col-span-6 lg:col-span-1" title={"Tags"}>
				<div className="mt-4">
					<Link href="#">
						<Chip className="m-0.5 cursor-pointer">Handphone</Chip>
					</Link>
					<Link href="#">
						<Chip className="m-0.5 cursor-pointer">Kroto</Chip>
					</Link>
					<Link href="#">
						<Chip className="m-0.5 cursor-pointer">Speaker</Chip>
					</Link>
					<Link href="#">
						<Chip className="m-0.5 cursor-pointer">Jacket</Chip>
					</Link>
					<Link href="#">
						<Chip className="m-0.5 cursor-pointer">Snack</Chip>
					</Link>
					<Link href="#">
						<Chip className="m-0.5 cursor-pointer">Jam Tangan</Chip>
					</Link>
				</div>
				{mounted && (
					<div className="mt-4">
						<Button
							onClick={() => toggle()}
							inline
							clear
							rounded
							className="gap-2 items-center"
						>
							{dark ? <FaSun size={24} /> : <FaMoon size={24} />}
						</Button>
					</div>
				)}
			</Menu>
			<div className="col-span-12 grid grid-cols-12 lg:my-6 text-sm">
				<hr className="col-span-12 py-4" />
				<CopyrightFooter className="text-sm pb-4 lg:pb-0" />
				<div className="hidden lg:flex col-span-12 lg:col-span-6 justify-end">
					<Image
						src="/assets/payment-methods.png"
						priority={true}
						width="320"
						height="24"
						alt={""}
					/>
				</div>
			</div>
		</div>
	);
}
