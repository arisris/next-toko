<script lang="ts">
    import FrontPageLayout from '$lib/components/Layouts/FrontPage/FrontPageLayout.svelte';

    let { data } = $props();
    let product = $derived(data.product);
    let comments = $derived(data.comments);
</script>

<FrontPageLayout>
    <div class="bg-white">
        <div class="pt-6">
            <!-- Product Info -->
            <div class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                     <!-- Image placeholder -->
                    <div class="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                        <span class="text-gray-500">Product Image</span>
                    </div>
                    <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                </div>

                <!-- Options -->
                <div class="mt-4 lg:mt-0 lg:row-span-3">
                    <h2 class="sr-only">Product information</h2>
                    <p class="text-3xl text-gray-900">${product.price}</p>

                    <div class="mt-10">
                        <button type="button" class="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add to bag</button>
                    </div>
                     <div class="mt-6">
                        <h3 class="text-sm text-gray-900 font-medium">Description</h3>
                        <div class="mt-4 prose prose-sm text-gray-500">
                             {product.description}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comments -->
            <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-10">
                <h3 class="text-lg font-medium text-gray-900">Reviews</h3>
                <div class="mt-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
                    {#each comments as comment}
                        <div class="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                            <div class="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:gap-x-8">
                                <div class="flex items-center xl:col-span-1">
                                    <div class="flex items-center">
                                         <!-- Stars -->
                                        <p class="text-yellow-400">{'★'.repeat(comment.rating || 0)}</p>
                                    </div>
                                    <p class="ml-3 text-sm text-gray-700">{comment.rating} out of 5 stars</p>
                                </div>

                                <div class="mt-4 lg:mt-0 xl:col-span-2 xl:mt-0">
                                    <h3 class="text-sm font-medium text-gray-900">{comment.authorName || 'Anonymous'}</h3>
                                    <div class="mt-3 space-y-6 text-sm text-gray-500">
                                        <p>{comment.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {:else}
                        <p class="mt-4 text-gray-500">No reviews yet.</p>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</FrontPageLayout>
