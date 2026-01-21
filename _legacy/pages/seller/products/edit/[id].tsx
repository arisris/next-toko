import FrontPageLayout from "@/components/Layouts/FrontPage";
import { trpc } from "@/lib/trpc";
import { Button, Card, Input, List, ListItem, Preloader, Textarea } from "konsta/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductModel } from "@/lib/zod";

const ProductForm = ({ onSubmit, defaultValues, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ProductModel.partial()),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <List>
          <ListItem
            title="Name"
            after={<Input {...register("name")} placeholder="Product Name" />}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <ListItem
            title="Description"
            after={<Textarea {...register("description")} placeholder="Product Description" />}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          <ListItem
            title="Price"
            after={<Input {...register("price", { valueAsNumber: true })} type="number" step="0.01" placeholder="Price" />}
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          <ListItem
            title="Stock"
            after={<Input {...register("stock", { valueAsNumber: true })} type="number" placeholder="Stock" />}
          />
          {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
        </List>
        <div className="p-4">
          <Button type="submit" large disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: product, isLoading } = trpc.product.query.useQuery({ id: Number(id) }, { enabled: !!id });
  const updateProduct = trpc.product.update.useMutation({
    onSuccess: () => router.push("/seller"),
  });

  const onSubmit = (data) => {
    updateProduct.mutate({ id: Number(id), data });
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
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <ProductForm onSubmit={onSubmit} defaultValues={product} isSubmitting={updateProduct.isLoading} />
      </div>
    </FrontPageLayout>
  );
}

EditProductPage.protected = true;
