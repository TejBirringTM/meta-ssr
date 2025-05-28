# MetaSSR

An opinionated template codebase for SSR (Server-Side Rendered) Application, based on the [Next.js](https://nextjs.org) framework.

- Modular monolith

- Strongly typed

- Prefers **structured declarations** over arbitrary sequences of instructions where possible
  
  - Favours **Behaviour-Driven Development (BDD)**, supported by robust test infrastructure

  - Encouranges maximum semantic information through **self-documenting *declarative* code**

## Features

- Declarative schema-validated API endpoints (see `./src/libs/utils/api-declr`)

- Backend Infrastructure
  - Relational Database: PostgreSQL
    - Interfaced using Prisma ORM
  - NoSQL Database: MongoDB
    - Interfaced using Model abstraction *(TODO)*

- Federated Authentication
  - Google Provider
  - GitHub Provider
  - *Others available...*

- Multitenancy Operation
  - Tenancies are Projects
    - Each Project has N resources
    - Project resources are stored in NoSQL database exclusive to the Project
    - Users are assigned role-based permissions on Project database
    - Users (created on first sign in via federated auth) and Projects are persisted in SQL database

- Test Infrastructure (see `./tests/README.md`)
  - Unit Tests
    - Frontend (i.e. DOM environment for component testing)
    - Backend (i.e. Node.js environment)

  - Integration Tests
    - Frontend + API
    - API + DB (supported by lightweight, ephemeral containers using [Testcontainers](https://testcontainers.com/))

  - End-to-End Tests

## Getting Started

### Setting up the Environment

Create a `.env` file based on `.env.example`.

### Bringing up the Development Infrastructure

1. Source .env file

    ```bash
        # in <project root dir>
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

5. Run the database post-initialisation SQL (rerun this command whenever you change a Prisma schema file in `./prisma/schema`)

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
