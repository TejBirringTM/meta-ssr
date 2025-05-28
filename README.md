# MetaSSR - Opinionated SSR Template for Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13+-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![Testing](https://img.shields.io/badge/Testing%20Coverage-Unit%20%7C%20Integration%20%7C%20E2E-25A162)](./tests/README.md)

An opinionated template for building server-side rendered (SSR) applications with Next.js, emphasizing type safety, declarative patterns, and comprehensive testing.

## ✨ Key Features

- **Modular Monolith Architecture** - Well-organized codebase with clear separation of concerns
- **Type-Safe Development** - Full TypeScript support end-to-end
- **Declarative Patterns** - Structured declarations over imperative code
- **Self-Documenting Code** - Emphasis on semantic, declarative patterns
- **Testing Pyramid** - Robust test coverage (Unit → Integration → E2E)
- **BDD-Oriented** - Behaviour-Driven Development with `*.spec.ts` focus

## 🛠️ Technical Stack

### Core Infrastructure

- **Frontend**: Next.js 13+ (App Router)
- **Relational DB**: PostgreSQL (Prisma ORM)
- **NoSQL DB**: MongoDB (Model abstraction)
- **API**: Declarative schema-validated endpoints

### Testing Suite

| Test Type       | Location                                                     |
| --------------- | ------------------------------------------------------------ |
| **Unit**        | `tests/unit/frontend`, `tests/unit/backend`                  |
| **Integration** | `tests/integration/frontend+api`, `tests/integration/api+db` |
| **E2E**         | `tests/e2e`                                                  |

## 🧪 Testing Strategy

We follow the Testing Pyramid approach with Behaviour-Driven Development (BDD) principles:

```text
 E2E (critical paths; few tests)
       /         \
 Integration      \
     /             \
Unit Tests (foundation; many tests)
```

▶ _[Full Testing Documentation](./tests/README.md)_

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Docker
- PostgreSQL & MongoDB (or use provided Docker setup)

### Setup

1. **Environment Configuration**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Launch Infrastructure**

   ```bash
   cd infra
   docker-compose up -d
   ```

3. **Database Initialization**

   ```bash
   # One-time setup
   cd infra/scripts
   ./execute.sh 00-initialise-db.sql

   # Apply Prisma migrations (always run after schema changes)
   npm run resync-db

   # Create server user (always run after Prisma migrations)
   ./execute.sh 01-create-user-for-server.sql
   ```

4. **Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## � Testing Commands

| Command                             | Description                                                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `test:unit:frontend`                | Run unit tests for frontend components                                                                |
| `test:unit:backend`                 | Run unit tests for backend modules                                                                    |
| `npm test:integration:frontend+api` | Run integration tests to test interaction of frontend components with API server                      |
| `npm test:integration:api+db`       | Run integration tests to test interaction of API server with other backend services such as databases |
| `npm test:e2e`                      | Run end-to-end tests                                                                                  |

## 📚 Learning Resources

### Core Technologies

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/docs)
- [Testing Best Practices](./tests/README.md)

## 🤝 Contributing

**Contributions are welcome!**

Please open an issue or PR for any improvements.

## 📄 License

[MIT](./LICENSE)
