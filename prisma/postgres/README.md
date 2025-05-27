# Developing the Relational Database

The [PostgreSQL](https://www.postgresql.org/about/) relational database management system (RDBMS) provides a means of persisting structured data.

For convenience, [Prisma](https://www.prisma.io/docs/orm/overview) object-relational mapper (ORM) is used to interface with the relational database from source code.

## Procedures

The data model is defined by the schema (`*.prisma` files in `/prisma/schema` directory).

### Syncing the Database - Shortcut (for Prototyping)

To regenerate the Prisma Client library and reset the database using the current schema: `npm run resync-db`

### Syncing the Database

After adjusting the data model, make sure to:

1. Regenerate the Prisma Client library which will includes types that reflect the new version of the schema: `npx prisma generate`

2. Migrate changes to the database (using [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate)), i.e. generate SQL files and runs them directly against the database: `npx prisma migrate dev --name <migration name in snake case>`, where:

    * The initial migration name is `init` by convention.

    * It is possible to "force" a schema onto a database without caring for migration history: `npx prisma db push --force-reset` (only useful in the early prototyping stages, otherwise, not recommended).

### Resetting the Database

Use the following commands to reset the database:

* **To drop all data tables, and then recreate them:**
`npx prisma db push --force-reset`

* **To drop all data tables, recreate them, and then run any migrations and seed scripts (if present):**
`npx prisma migrate reset`
