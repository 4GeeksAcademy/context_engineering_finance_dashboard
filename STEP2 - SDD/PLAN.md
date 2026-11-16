# 💻 What You Need to Do

## Phase 1 — Explore the API (with the agent)

- [ ] With the backend running, ask the agent to map the endpoints, response shapes, and query parameters for all three features using `/docs`.
- [ ] Cross-check against existing frontend fetch patterns in the repo where helpful.
- [ ] Note any mismatches between PM wording and actual API fields — resolve them in the spec, not at implementation time.
- [ ] Optional: short verification trail in commit messages or `verification.md`.

## Phase 2 — TypeScript types (agent drafts, you verify)

- [ ] Have the agent draft `frontend/specs/api-types.ts` with interfaces for API responses used by the three features:
  - `FacetsResponse` — date range reference and B2B vs B2C view
  - `AlertEntry`, `AlertsResponse` — anomaly table
  - `CategoryEntry`, `TopCategoriesResponse` — B2B vs B2C comparison table
- [ ] Have the agent draft `frontend/specs/param-types.ts` with query parameter types:
  - `DateRangeFilter` — optional start/end dates as `string` in `YYYY-MM-DD` format
  - `AlertsParams` — threshold plus date range filter
  - `TopCategoriesParams` — operation type, limit, and date range filter
- [ ] Verify every property name and type against `/docs`; strict TypeScript — no `any`, no `object`.
- [ ] Every property needs JSDoc: meaning, valid values, format where applicable.
- [ ] Commit: types verified against OpenAPI.

## Phase 3 — Component specifications (agent drafts, you verify)

- [ ] Have the agent draft `frontend/specs/components.md` for each feature:

  **Feature 1 — Date range filter**
  - Component name(s), props, layout
  - Behavior when only one date input is filled
  - How the available date range hint (from `FacetsResponse`) is displayed

  **Feature 2 — Anomaly alerts table**
  - Component name(s) and props
  - Four columns and their data types
  - Empty state when alerts array is empty
  - Behavior when threshold input is out of range

  **Feature 3 — B2B vs B2C comparison view**
  - Components for two-panel layout, top-5 table, comparison chart
  - Props for each component
  - What each panel renders when top-5 list is empty
  - What the comparison chart displays and what its two data points represent

- [ ] Align component props with types from Phase 2; resolve ambiguities the PM brief left open.
- [ ] Commit: component specs.

## Phase 4 — Data contract documentation

- [ ] Have the agent draft `frontend/specs/README.md` covering all three features:
  - Endpoint(s) each feature consumes (paths verified in `/docs`)
  - TypeScript types for each request and response
  - Valid values and constraints for every parameter
  - At least 2 edge cases per feature and what the UI must show
- [ ] Read it as if you were handing it to a fresh agent session — fix anything that would trigger follow-up questions.
- [ ] Run `npx tsc --noEmit` and fix type errors.
- [ ] Commit: data contract README.

> ⚠️ IMPORTANT: You are specifying the frontend layer, not implementing it. Do not build React components or wire API calls. Deliverables: TypeScript types, `components.md`, and `frontend/specs/README.md`.