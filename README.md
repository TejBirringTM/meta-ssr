# MetaSSR: Production-Grade AI-Powered SSR Web Applications

[![GitHub Stars](https://img.shields.io/github/stars/TejBirringTM/meta-ssr?style=social)](https://github.com/TejBirringTM/meta-ssr/stargazers)
[![License](https://img.shields.io/github/license/TejBirringTM/meta-ssr?color=blue)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/TejBirringTM/meta-ssr?q=is%3Aissue%20state%3Aopen)](https://github.com/TejBirringTM/meta-ssr/commits/main)
[![GitHub Issues](https://img.shields.io/github/issues/TejBirringTM/meta-ssr)](https://github.com/TejBirringTM/meta-ssr/issues/?q=is%3Aissue%20state%3Aopen)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
![AI-Ready](https://img.shields.io/badge/AI--Ready-Augmented_Intelligence-FF6F00)
![AI-Ready](https://img.shields.io/badge/AI--Ready-Agentic_Workflows-FF6F00)
[![Testing](https://img.shields.io/badge/Testing%20Coverage-Unit%20%7C%20Integration%20%7C%20E2E-25A162)](./tests/README.md)

MetaSSR is an opinionated template for building **AI-ready, server-side rendered web applications** with Next.js.

MetaSSR empowers developers to create **augmented intelligence systems** and **agentic workflows** by seamlessly integrating single or multimodal ML models into production-ready SSR apps — all with strict type safety, declarative patterns, and comprehensive testing baked in.

## 🎯 Why MetaSSR?

### Rapid Integration

Deploy ML models (LLMs, vision, speech, etc.) as API endpoints with type-safe, declarative schemas — no boilerplate!

### Hybrid Architecture

Combine deterministic SSR logic with dynamic streaming AI agents in a unified Next.js framework.

### Multimodal Ready

Process text, images, and structured data in cohesive workflows (e.g., RAG pipelines with real-time UI updates).

### Testable by Design

Built-in support for mocking services and containerised testing.

## 🧩 Use Cases

- **Agentic Workflows:** Chatbots with memory, autonomous research agents

- **Augmented Interfaces:** Real-time document analysis + SSR rendering

- **Multimodal Pipelines:** Vision + text models with unified API contracts

## ✨ Key Features

- **Modular Monolith Architecture** - Well-organised codebase with clear separation of concerns

- **Type-Safe Development** - Full TypeScript support end-to-end

- **Declarative Patterns** - Structured declarations over imperative code

- **Self-Documenting Code** - Emphasis on semantic, declarative patterns

- **Testing Pyramid** - Robust test coverage (Unit → Integration → E2E)

- **BDD-Oriented** - Behaviour-Driven Development with `*.spec.ts` focus

- **Zero-Config Instrumentation** - Built-in tracing to capture response latency; AI prompts and token usage, etc.

### 🦾 AI Superpowers

- 🚧 **Agentic Workflow Engine** - Build scalable, autonomous AI processes using built-in state management, asynchronous queue processing, and real-time event signaling for seamless multi-step orchestration.

  - **Cost Controls** -
  Automatic rate limiting and spend tracking per model

  - **Fallback Strategies** - Configurable failover for unreliable model APIs

- 🚧 **SSR + Streaming AI** - Serve static shells while streaming model responses

- 🚧 **Deterministic Caching** - Versioned outputs for reproducible AI results

- 🚧 **Benchmarking Suite** - Compare model performance across deployments

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

## 🛡️ Testing Strategy

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

3. **Database Initialisation**

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

## 🧪 Testing Commands

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

## 💖 Sponsor This Project

Help us build the future of AI-powered SSR:

- [Become a GitHub Sponsor](https://github.com/sponsors/tejbirringTM)
- [Become a Corporate Sponsor](mailto:tejbirring@gmail.com?subject=Interested%20in%20sponsoring%20MetaSSR...)

## 📄 License

[MIT](./LICENSE)
