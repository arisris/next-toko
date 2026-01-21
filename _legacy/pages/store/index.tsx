import { useState } from "react";
import { trpc } from "@/lib/trpc";
import FrontPageLayout from "@/components/Layouts/FrontPage";
import { Card, Input, Button, Block, Preloader } from "konsta/react";
import Link from "next/link";

function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card
        className="col-span-6 lg:col-span-3 p-2 h-72 rounded-md hover:shadow-lg hover:border"
      >
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0">
            <div className="h-32 w-full bg-gray-200" />
          </div>
          <div className="flex-grow flex flex-col justify-between p-2">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description?.substring(0, 50)}...</p>
            <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function StorePageIndex() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = trpc.product.all.useInfiniteQuery(
    {
      limit: 12,
      search,
      sortBy,
    },
    {
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );

  return (
    <FrontPageLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {isLoading && <Preloader />}

        <div className="grid grid-cols-12 gap-4">
          {data?.pages.map((page) =>
            page.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {hasNextPage && (
          <div className="text-center mt-4">
            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </FrontPageLayout>
  );
}