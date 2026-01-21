<script lang="ts">
    import { enhance } from '$app/forms';
    let { data } = $props();
    let products = $derived(data.products);
</script>

<div class="flex justify-between items-center mb-6">
    <h2 class="text-xl font-semibold">My Products</h2>
    <a href="/seller/products/add" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Add Product</a>
</div>

<div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
        {#each products as product}
            <li>
                <a href="/seller/products/{product.id}" class="block hover:bg-gray-50">
                    <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                            <p class="text-sm font-medium text-indigo-600 truncate">{product.name}</p>
                            <div class="ml-2 flex-shrink-0 flex">
                                <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Stock: {product.stock}
                                </p>
                            </div>
                        </div>
                        <div class="mt-2 sm:flex sm:justify-between">
                            <div class="sm:flex">
                                <p class="flex items-center text-sm text-gray-500">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</div>
