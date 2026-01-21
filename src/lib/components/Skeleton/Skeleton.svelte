<script lang="ts">
    import { type ClassValue, clsx } from 'clsx';
    import { twMerge } from 'tailwind-merge';
    import { type Snippet } from 'svelte';

    let { class: className, children, loadingChildren } : {
        class?: string;
        children?: Snippet;
        loadingChildren?: Snippet;
    } = $props();

    function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }
</script>

<div class={cn("animate-pulse bg-gray-200 rounded", className)}>
    {#if loadingChildren}
        {@render loadingChildren()}
    {/if}
</div>
