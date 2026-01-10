import HomepageCarousel from "@/components/Banner/HomepageCarousel";
import Skeleton from "@/components/Skeleton/Skeleton";
import FrontPageLayout from "components/Layouts/FrontPage";
import { trpc } from "@/lib/trpc";
import { Card } from "konsta/react";

function ProductCard({ product }) {
	return (
		<Card
			className="col-span-6 lg:col-span-2 p-2 h-64 rounded-md hover:shadow-lg hover:border"
		>
			<div className="flex flex-col h-full">
				<div className="flex-shrink-0">
					{/* You can add an image here if your product has one */}
					{/* <img src={product.image} alt={product.name} className="h-32 w-full object-cover" /> */}
					<div className="h-32 w-full bg-gray-200" />
				</div>
				<div className="flex-grow flex flex-col justify-between p-2">
					<h3 className="font-semibold">{product.name}</h3>
					<p className="text-sm text-gray-500">{product.description?.substring(0, 50)}...</p>
				</div>
			</div>
		</Card>
	);
}

export default function Index() {
	const { data, isLoading } = trpc.product.all.useQuery({ limit: 18, cursor: null });

	return (
		<FrontPageLayout>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12">
					<HomepageCarousel />
				</div>

				<Skeleton className="col-span-12 lg:col-span-8 h-80" />
				<Skeleton className="col-span-12 lg:col-span-4" />

				<Skeleton
					className="col-span-12 grid grid-cols-12 gap-2"
					loadingChildren={Array(4)
						.fill(null)
						.map((_, k) => (
							<Skeleton
								key={`key${k}`}
								className="col-span-3 m-2 h-20 !bg-gray-100 dark:!bg-popover-dark rounded-md"
							/>
						))}
				/>
				<Skeleton className="col-span-6 lg:col-span-4 w-80 h-8" />
				<Skeleton className="col-span-6 lg:col-start-10 lg:col-span-3 w-48 h-8 place-self-end" />
				{isLoading && Array(18)
					.fill(null)
					.map((_, k) => (
						<Skeleton
							key={`key${k}`}
							className="col-span-6 lg:col-span-2 p-2 h-64 rounded-md hover:shadow-lg hover:border"
						/>
					))}
				{data?.items.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</FrontPageLayout>
	);
}
