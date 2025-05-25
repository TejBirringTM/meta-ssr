# SSR Template

This is a template for a SSR (Server-Side Rendering) Application based on [Next.js](https://nextjs.org).

Features:

- Relational Database: PostgreSQL
  (interfaced using Prisma ORM)

- Declarative schema-validated API endpoints

- Federated Authentication
  - Google Provider

- Multitenant Operation
  - Role-based permissions

## Getting Started

### Setting up the Environment

Create a `.env` file based on `.env.example`.

### Bringing up the Development Infrastructure

1. Source .env file

    ```bash
        cd <project dir>
        set -a && source .env && source +a
    ```

2. Use docker-compose to launch containers

    ```bash
        cd infra
        docker-compose up -d
    ```

3. Run the database pre-initialisation SQL (only once, unless containers or corresponding volumes were destroyed)

    ```bash
        cd infra/scripts
        ./execute.sh 00-initialise-db.sql
    ```

4. Run the following command to create data tables using the Prisma schema (rerun this command whenever you change a Prisma schema file in `./prisma/schema`)

    ```bash
        npm run resync-db
    ```

5. Run the database post-initialisation SQL (only once, unless containers or corresponding volumes were destroyed)

    ```bash
        cd infra/scripts
        ./execute 01-create-user-for-server.sql
    ```

### Developing the SSR (Next.js)

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

### Next.js Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js)
