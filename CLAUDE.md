# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`@digifi/digifi-node-js` is a TypeScript SDK for the DigiFi platform REST API (docs: https://docs.digifi.io/reference/digifi-api). It is a thin typed wrapper: no runtime validation, just request building, typed params/responses, retries, and error mapping.

## Commands

- `npm run build`: compile `src/` to `lib/` with `tsc` (also runs on `npm install` via `prepare`). This is the only check available; there is no test suite and no linter configured.
- Publishing is done by GitHub Actions (`.github/workflows/`): `publish.yml` runs `npm publish` when a GitHub release is published, and `publish-on-tag.yml` is a manual dispatch with a custom npm tag.

## Architecture

**Entry point.** `src/index.ts` re-exports everything from `api`, `clients`, `data/models`, `enums`, `errors`, `types`, `utils`. Anything public must be exported through the relevant `index.ts` barrel.

**HTTP layer (`src/clients/`).**
- `ApiClient.makeCall(path, method, body, options)` is the single network primitive. It sets the `api-version` header from `options.apiVersion`, JSON-stringifies bodies (except `string`/`FormData`), adds an `idempotency-key` (UUID) to POST requests when enabled, retries with exponential backoff via `retry` (on `NetworkError`, 409, 5xx, or a `digifi-should-retry: true` response header), and maps non-2xx responses to `ApiRequestError`.
- Binary downloads: set a `responseType: arraybuffer` header and `makeCall` returns the raw response instead of JSON (see `api/base/DownloadApi.ts`).
- `AuthorizedApiClient` adds the `api-key` header.
- `CompatibleApiVersion` in `ApiClient.ts` is the API version the SDK's types target. Bumping it is a major-version change (see CHANGELOG).

**API services (`src/api/`).** Each `XxxApi.ts` file holds, together:
- the resource model, enums, and param types for that domain;
- an `XxxApi` interface (the public contract);
- an `XxxRestApi` class implementing it.

Most classes extend `SystemApi<Resource, CreateParams, UpdateParams, FindParams, ListParams>` (`api/base/`), set `protected path = '/resource'`, and inherit `create`/`update`/`find`/`search`/`list`/`findById`/`delete`. Custom endpoints call `this.apiClient.makeCall(...)` directly. Query strings are built with `utils/getSearchParams`.

Borrower and intermediary portal auth flows (accounts, sessions, invites, reset password, email/phone verification) share implementations in `api/abstract/`, which extend `api/base/AuthApi`. That class prefixes paths with `/borrowers` or `/intermediaries`. Thin subclasses such as `BorrowerSessionsRestApi` only pass the reference.

`api/DigifiApi.ts` is the facade users instantiate. It creates one `AuthorizedApiClient` and exposes every service as a property typed by its interface (not by the `RestApi` class).

**Adding a new API service:** create `src/api/XxxApi.ts`, export it from `src/api/index.ts`, then add a typed property and instantiate it in the `DigifiApi` constructor.

**Other directories.** `data/models` holds shared domain models (variables, formulas, branding, etc.). `types` holds cross-cutting types (pagination, resource metadata, uploads). `enums` holds shared enums. `utils/webhook.ts` holds webhook signature/timestamp verification.

## Conventions for changes

Each feature change (see commits like `ND-8890 ...`) also:
- adds an entry at the top of `CHANGELOG.md` in the form `## X.Y.Z - YYYY-MM-DD` followed by bullets naming the added or changed interfaces/methods in backticks;
- bumps `version` in `package.json` and `package-lock.json` (semver: new methods/fields → minor, API version changes or renames → major);
- when public methods change, updates the method list under "API Services" in `README.md`.

To deprecate a field or service, add a `@deprecated` JSDoc tag instead of removing it. Removals happen only in major versions.
