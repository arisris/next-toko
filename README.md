## Nextjs based simple eCommerce
Work in progress

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
$ pnpm exec prisma migrate dev
$ pnpm exec prisma migrate reset
$ pnpm dev
```

After this you already have some seed data in DATABASE

Test login with github account at http://localhost:3000/api/auth/signin

TRPC server located at http://localhost:3000/api/trpc

Thats it. Thankyou

### TODO

Prepare move from graphql to trpc

### Links

[My Homepage](https://arisris.com/)