## Next.js simple eCommerce

This is Really Work in progress

Test test test.

[![Demo](https://img.youtube.com/vi/Eqtq1SDo5ZI/0.jpg)](https://www.youtube.com/watch?v=Eqtq1SDo5ZI)

### Simple Usage

Create mysql database in your local computer

copy .env.example > .env

edit .env and change DATABASE_URL

In this case i use "pnpm" for now i'm not sure that with other package manager can work. so
install "pnpm" first

```bash
$_ npm -g i pnpm
```

Follow instruction

```bash
$ git clone https://github.com/arisris/next-toko.git
$ cd next-toko
$ pnpm install
$ pnpm prisma migrate dev
$ pnpm prisma generate
$ pnpm prisma migrate reset
$ pnpm dev
```

To generate crud router for first time based on your data

```bash
$ pnpm ts-node -T ./prisma/generateCrudRouter.ts
```

The output is located at _/server/generated_
Now rename _/server/generated_ _to /server/routers_

To generate some indonesian region

```bash
$ pnpm ts-node -T ./prisma/seed-region.ts
```

After this you already have some seed data in DATABASE

Test login with github account at http://localhost:3000/api/auth/signin

Test admin page. located at http://localhost:3000/admin

TRPC server located at http://localhost:3000/api/trpc

Thats it. Thankyou

### TODO

- [ ] Prepare move from graphql to trpc
- [ ] Admin Page
- [ ] Customer Page
- [ ] Seller Page
- [ ] Cart Page
- [ ] Homepage
- [ ] ....??

### Contribute

So I'm really looking forward to your contribution to this repository

### Links

[Arisris.com](https://arisris.com/)
