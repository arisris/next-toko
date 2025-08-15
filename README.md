# Next.js simple eCommerce

This is a simple eCommerce application built with Next.js, tRPC, Prisma, and Tailwind CSS.

[![Demo](https://img.youtube.com/vi/Eqtq1SDo5ZI/0.jpg)](https://www.youtube.com/watch?v=Eqtq1SDo5ZI)

## Features

*   **Homepage:** Displays a grid of products.
*   **Customer/Store Page:** A full-featured store page with product filtering, sorting, and infinite scrolling.
*   **Product Detail Page:** View details for a single product.
*   **Cart:** Fully functional shopping cart. Add, remove, and update quantities.
*   **Admin Dashboard:** A dashboard for administrators to view site statistics, including user counts, product counts, and user signups over time.
*   **Seller Dashboard:** A dashboard for sellers to manage their products (list, add, edit, delete).
*   **Authentication:** Users can sign in with a GitHub account.

## Simple Usage

The project is now configured to use SQLite, so no external database setup is required. The database file will be created automatically at `prisma/dev.db`.

In this case we use "pnpm". It is recommended to install "pnpm" first.

```bash
$_ npm -g i pnpm
```

Follow these instructions to get started:

```bash
$ git clone https://github.com/arisris/next-toko.git
$ cd next-toko
$ pnpm install
$ pnpm prisma migrate dev
$ pnpm dev
```

The `prisma migrate dev` command will create the SQLite database and run the seed script to populate it with initial data.

You can then access the application at http://localhost:3000.

-   **Test login:** Use the GitHub provider at http://localhost:3000/api/auth/signin
-   **Admin page:** http://localhost:3000/admin (you will need to be logged in as an admin)
-   **Seller page:** http://localhost:3000/seller (you will need to be logged in as a user with a store)

## TODO

- [x] Prepare move from graphql to trpc
- [x] Admin Page
- [x] Customer Page
- [x] Seller Page
- [x] Cart Page
- [x] Homepage
- [ ] ....??

## Contribute

So I'm really looking forward to your contribution to this repository.

## Links

[Arisris.com](https://arisris.com/)
