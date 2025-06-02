# Testing

**There are three main types of tests:**

| Feature          | Unit Tests                                 | Integration Tests                        | End-to-End (E2E) Tests                          |
| ---------------- | ------------------------------------------ | ---------------------------------------- | ----------------------------------------------- |
| **Scope**        | Isolated functions/classes                 | Interactions between modules             | Entire system (UI + backend + DB)               |
| **Goal**         | Verify **individual units** work correctly | Check if **components work together**    | Validate **user flows** in real-world scenarios |
| **Dependencies** | Mocked (e.g., `jest.fn()`)                 | Partial mocks (e.g., real DB + fake API) | No mocks (real everything)                      |
| **Speed**        | ⚡ **Fastest** (ms per test)               | 🏃 **Moderate** (seconds)                | 🐢 **Slowest** (seconds to minutes)             |
| **When to Use?** | During development                         | After units are tested                   | Pre-release (smoke tests)                       |

**In short:**

- **Unit Tests:** Used to test utils, pure functions, isolated components.
- **Integration Tests:** Used to test API routes, SSR logic, DB queries.
- **E2E Tests:** Used to test critical user flows (login, payment).

## End-to-End Testing (`tests/e2e`)

**Full system, real browser, user-like testing.**

**Useful for critical user journeys (e.g., checkout flow, auth).**

### Scope of E2E Tests

Tests the entire application flow from the user's perspective, including frontend, backend, APIs, databases, and network.

### Goal of E2E Tests

Ensures that the app works as expected in a real-world scenario (e.g., a user logging in, navigating, and performing actions).

### Examples of E2E Tests

- Testing if a page renders correctly after a server fetch.

- Verifying that a form submission updates the database and reflects changes in the UI.

- Checking authentication flow (login → redirect → session persistence).

### Pros and Cons of E2E Tests

| Pros                                       | Cons                                       |
| ------------------------------------------ | ------------------------------------------ |
| Closest to real user behaviour.            | Slow to run (requires full app + browser). |
| Catches issues between frontend & backend. | Flaky (depends on network, backend, etc.). |

### Tools Used for E2E Testing

- [Playwright](https://playwright.dev/) — complete end-to-end test framework based on multi-browser orchestration

## Integration Testing (`tests/integration`)

**Smaller scope, tests how parts of the app work together.**

**Useful for API ↔ frontend interactions, SSR rendering logic.**

### Scope of Integration Tests

Tests how multiple units/modules work together (but not the whole system).

### Goal of Integration Tests

Ensures that different parts of the app (e.g., API + frontend components, server + database) interact correctly.

### Examples of Integration Tests

- Testing if a React component correctly renders with data fetched from an API.

- Verifying that the server-side rendering logic integrates well with the Redux store.

- Checking if API routes return the correct data shape for the frontend.

### Pros and Cons of Integration Tests

| Pros                                      | Cons                                       |
| ----------------------------------------- | ------------------------------------------ |
| Faster than E2E (no full browser needed). | Doesn’t test the full user journey.        |
| More reliable (fewer moving parts).       | May require mocking (e.g., API responses). |

### Tools Used for Integration Testing

#### Tools for Integration Testing: Frontend + Backend/API Calls

- [Vitest](https://vitest.dev/) — fast test runner

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) — provides APIs for working with React components; allows testing Frontend with Backend/API calls

- [Mock Service Worker (MSW)](https://mswjs.io/) - for mocking API calls by intercepting a request and handling its response (can be a mocked response, a combination of the real response and a mock, or nothing — if you only want to monitor the traffic)

- [next-router-mock](https://www.npmjs.com/package/next-router-mock) - a Next.js router implementation that keeps state of `URL` in memory to test routes

- [node-mocks-http](https://www.npmjs.com/package/node-mocks-http) - mock `node:http` package's `request` and `response` objects to test routing and request handling functions

#### Tools for Integration Testing: Backend/API Calls + Database

- [Supertest](https://www.npmjs.com/package/supertest) - provides high-level abstraction for testing HTTP, while allowing you to drop down to the lower-level API if/when required

- [Testcontainers](https://testcontainers.com/) - provides throwaway, lightweight instances of containerised services (e.g. databases, message brokers, web browsers) using Docker; eliminates need for mocks or in-memory services

## Unit Testing (`tests/unit`)

**Test individual units (functions, classes, or components) in isolation from dependencies.**

### Scope of Unit Tests

- Tests the smallest parts of code (e.g., a single function, method, or class).

- Isolates dependencies (mocks/stubs databases, APIs, etc.).

- Focuses on logic correctness, not integrations.

### Goal of Unit Tests

- Verify individual units work as expected.

- Catch bugs early in development.

- Ensure code maintainability (refactoring safety net).

- Document expected behaviour of code.

| Pros                                             | Cons                                                           |
| ------------------------------------------------ | -------------------------------------------------------------- |
| **Fast execution** (milliseconds per test).      | **Limited coverage** (misses system-wide issues).              |
| **Precise feedback** (points to exact failures). | **Mock complexity** (can over-mock, making tests unrealistic). |
| **Encourages modular design** (testable code)    | **False confidence** (passing tests ≠ working system).         |
| **Living documentation** (describes behaviour).  | **Maintenance overhead** (tests break during refactors).       |

### Tools Used for Unit Testing

- [Vitest](https://vitest.dev/) — fast test runner

## Approach to Testing

### `*.test.ts` vs. `*.spec.ts`

While both suffixes are functionally equivalent (they work the same way), their usage often reflects subtle differences in intent or convention:

#### Semantic Differences

| Suffix     | Meaning                                                                             | Common Use Case                               |
| ---------- | ----------------------------------------------------------------------------------- | --------------------------------------------- |
| `.test.ts` | Explicitly indicates a **test file.**                                               | Focused on **testing functionality.**         |
| `.spec.ts` | Short for "**specification**" (derived from **behaviour-driven development, BDD**). | Focused on **describing expected behaviour.** |

#### Examples

- **`.test.ts` → "Does this code work correctly?"**

  - Example: `userService.test.ts` (tests if `userService` methods behave as expected).

  - Code Example:

    ```typescript
    import { add } from './math';

    test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3); // Tests implementation
    });
    ```

- **`.spec.ts` → "Does this code meet the specified requirements?"**

  - Example: `userService.spec.ts` (describes how `userService` should behave).

  - Code Example:

    ```typescript
    import { add } from './math';

    describe('Math module', () => {
        it('should correctly add two numbers', () => {
            expect(add(1, 2)).toEqual(3); // Describes behaviour
        });
    });
    ```

#### Favour BDD Over Imperative Testing

This project should favour behaviour-driven development (BDD, `*.spec.ts`) over imperative testing (`*.test.ts`).

Imperative tests are only to be used in exceptional scenarios.

### Testing Pyramid (The Ideal Balance)

```text
        E2E (Fewer)
       /         \
 Integration      \
     /             \
Unit Tests (Many)
```

- **Base**: Many unit tests (fast, cheap).
- **Middle**: Fewer integration tests.
- **Top**: Minimal E2E tests (high-value flows).

### Final Advice

- **Start with unit tests** for core logic.
- **Add integration tests** for key module interactions.
  - **Avoid mocking too much** — use real APIs/DBs when possible.
- **Reserve E2E tests** for critical paths.
  - **Never mock** — always use real APIs/DBs.
- **Run tests in CI** to catch issues early.
