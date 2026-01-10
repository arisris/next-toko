<script lang="ts">
  import FrontPageLayout from '$lib/components/Layouts/FrontPage/FrontPageLayout.svelte';
  import HomepageCarousel from '$lib/components/Banner/HomepageCarousel.svelte';
  import Skeleton from '$lib/components/Skeleton/Skeleton.svelte';
  import ProductCard from '$lib/components/Product/ProductCard.svelte';

  interface Product {
      id: number;
      name: string;
      description: string | null;
      price: number;
      stock: number;
  }

  let { data } = $props();
  let products = $derived(data.products as Product[]);
</script>

<FrontPageLayout>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12">
      <HomepageCarousel />
    </div>

    <Skeleton class="col-span-12 lg:col-span-8 h-80" />
    <Skeleton class="col-span-12 lg:col-span-4" />

    <div class="col-span-12 grid grid-cols-12 gap-2">
        {#each Array(4) as _}
            <Skeleton class="col-span-3 m-2 h-20 !bg-gray-100 dark:!bg-gray-800 rounded-md" />
        {/each}
    </div>

    <Skeleton class="col-span-6 lg:col-span-4 w-80 h-8" />
    <Skeleton class="col-span-6 lg:col-start-10 lg:col-span-3 w-48 h-8 place-self-end" />

    {#each products as product (product.id)}
        <ProductCard {product} />
    {/each}
  </div>
</FrontPageLayout>
