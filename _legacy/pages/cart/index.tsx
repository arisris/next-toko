import { trpc } from "@/lib/trpc";
import FrontPageLayout from "@/components/Layouts/FrontPage";
import { Button, Card, List, ListItem, Preloader } from "konsta/react";
import { useMemo } from "react";
import Link from "next/link";

export default function CartPage() {
  const { data: cart, isLoading, refetch } = trpc.cart.get.useQuery();
  const updateQuantity = trpc.cart.updateQuantity.useMutation({ onSuccess: () => refetch() });
  const removeItem = trpc.cart.remove.useMutation({ onSuccess: () => refetch() });

  const totalPrice = useMemo(() => {
    return cart?.items.reduce((total, item) => total + item.product.price * item.quantity, 0) ?? 0;
  }, [cart]);

  if (isLoading) {
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
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart?.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Card>
            <List>
              {cart?.items.map((item) => (
                <ListItem
                  key={item.id}
                  title={item.product.name}
                  after={`$${(item.product.price * item.quantity).toFixed(2)}`}
                  footer={
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        small
                        onClick={() => updateQuantity.mutate({ cartItemId: item.id, quantity: item.quantity - 1 })}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button small onClick={() => updateQuantity.mutate({ cartItemId: item.id, quantity: item.quantity + 1 })}>+</Button>
                      <Button small clear onClick={() => removeItem.mutate({ cartItemId: item.id })}>
                        Remove
                      </Button>
                    </div>
                  }
                />
              ))}
            </List>
          </Card>
        )}
        <div className="mt-4 text-right">
          <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
          <Link href="/checkout">
            <Button large className="mt-2">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </FrontPageLayout>
  );
}

CartPage.protected = true;
