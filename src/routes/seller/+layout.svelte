<script>
    import FrontPageLayout from '$lib/components/Layouts/FrontPage/FrontPageLayout.svelte';
    let { children } = $props();
</script>

<FrontPageLayout>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6">Seller Dashboard</h1>
        <div class="grid grid-cols-4 gap-4">
            <aside class="col-span-1">
                <nav class="space-y-2">
                    <a href="/seller/products" class="block p-2 rounded hover:bg-gray-100">Products</a>
                    <a href="/seller/orders" class="block p-2 rounded hover:bg-gray-100">Orders</a>
                    <a href="/seller/settings" class="block p-2 rounded hover:bg-gray-100">Settings</a>
                </nav>
            </aside>
            <main class="col-span-3">
                {@render children()}
            </main>
        </div>
    </div>
</FrontPageLayout>
