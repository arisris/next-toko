<script>
    import Navbar from './Navbar.svelte';
    import Footer from './Footer.svelte';
    let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 py-8">
        {@render children()}
    </main>
    <Footer />
</div>
