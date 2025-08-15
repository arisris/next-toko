import FrontPageLayout from "@/components/Layouts/FrontPage";
import { trpc } from "@/lib/trpc";
import { Button, Card, List, ListItem, Preloader } from "konsta/react";
import Link from "next/link";

export default function SellerPage() {
  const { data: store } = trpc.store.myStore.useQuery();
  const deleteProduct = trpc.product.delete.useMutation({ onSuccess: () => refetch() });
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = trpc.product.all.useInfiniteQuery(
    {
      limit: 10,
      storeId: store?.id,
    },
    {
      enabled: !!store,
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );

  return (
    <FrontPageLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your Products</h1>
          <Link href="/seller/products/add">
            <Button>Add Product</Button>
          </Link>
        </div>

        {isLoading && <Preloader />}

        <Card>
          <List>
            {data?.pages.map((page) =>
              page.items.map((product) => (
                <ListItem
                  key={product.id}
                  title={product.name}
                  after={`$${product.price.toFixed(2)}`}
                  footer={
                    <div className="flex gap-2 mt-2">
                      <Link href={`/seller/products/edit/${product.id}`}>
                        <Button small>Edit</Button>
                      </Link>
                      <Button small clear onClick={() => {
                        if (confirm("Are you sure you want to delete this product?")) {
                          deleteProduct.mutate({ id: product.id });
                        }
                      }}>Delete</Button>
                    </div>
                  }
                />
              ))
            )}
          </List>
        </Card>

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

SellerPage.protected = true;
