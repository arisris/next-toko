export async function load({ fetch }) {
    try {
        const res = await fetch('/api/products?limit=18');
        const data = await res.json();
        return {
            products: data.items
        };
    } catch (e) {
        console.error("Error loading products:", e);
        return {
            products: []
        };
    }
}
