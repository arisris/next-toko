<script lang="ts">
    let { product } = $props();
</script>

<div class="col-span-6 lg:col-span-2 p-2 h-64 rounded-md hover:shadow-lg hover:border bg-white dark:bg-gray-800">
    <div class="flex flex-col h-full">
        <div class="flex-shrink-0">
            <div class="h-32 w-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div class="flex-grow flex flex-col justify-between p-2">
            <h3 class="font-semibold">{product.name}</h3>
            <p class="text-sm text-gray-500">{product.description?.substring(0, 50)}...</p>
        </div>
    </div>
</div>
