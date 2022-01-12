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
$_ git clone https://github.com/arisris/next-toko.git
$_ cd next-toko
$_ pnpm install
$_ pnpm exec prisma migrate dev
$_ pnpm exec prisma migrate reset
$_ pnpm dev
```

After this you already have some seed data in DATABASE
test login at http://localhost:3000/api/auth/signin
user: admin
password: password123

GraphGL server located at http://localhost:3000/api/graphql

Thats it. Thankyou

### TODO
Curently i'm working at graphql server api located at folder /nexus/

### Links

[My Homepage](https://arisis.com/)