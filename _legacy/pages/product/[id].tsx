import { useRouter } from "next/router";
import { trpc } from "@/lib/trpc";
import FrontPageLayout from "@/components/Layouts/FrontPage";
import { Button, Card, Preloader } from "konsta/react";
import { useState } from "react";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: product, isLoading } = trpc.product.query.useQuery({ id: Number(id) }, { enabled: !!id });
  const addToCart = trpc.cart.add.useMutation();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart.mutate({ productId: product.id, quantity });
    // You might want to show a toast notification here
  };

  if (isLoading || !product) {
    return (
      <FrontPageLayout>
        <div className="p-4">
          <Preloader />
        </div>
      </FrontPageLayout>
    );
  }

  return (
    <FrontPageLayout>
      <div className="p-4">
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="h-64 w-full bg-gray-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-lg font-bold my-2">${product.price.toFixed(2)}</p>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex items-center gap-2 mt-4">
                <Button small onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                <span>{quantity}</span>
                <Button small onClick={() => setQuantity(q => q + 1)}>+</Button>
              </div>
              <Button large className="mt-4" onClick={handleAddToCart} disabled={addToCart.isLoading}>
                {addToCart.isLoading ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </FrontPageLayout>
  );
}
