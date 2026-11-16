# ✅ What We Will Evaluate

- [ ] API exploration evidence: types and endpoints traceable to `/docs`, not guessed field names.
- [ ] All response interfaces match live OpenAPI shapes, without `any`.
- [ ] `DateRangeFilter` has both fields optional, typed as `string` with `YYYY-MM-DD` JSDoc.
- [ ] `AlertsParams` and `TopCategoriesParams` extend or include `DateRangeFilter`.
- [ ] `components.md` names every component, lists props with types, specifies conditional rendering per feature.
- [ ] Anomaly table empty state explicitly specified.
- [ ] Single-date-input behavior explicitly specified.
- [ ] Both B2B vs B2C panels specify empty top-5 rendering.
- [ ] `frontend/specs/README.md` covers all three features with endpoints, types, parameters, and ≥ 2 edge cases each.
- [ ] TypeScript compiles (`npx tsc --noEmit`).
- [ ] Work on `feature/frontend-specs` with meaningful commits; specs read as agent-assisted work you verified.
- [ ] No React components, fetch calls, or backend changes.

Note: Implementation is out of scope. A spec good enough for a coding agent to build without questions is the bar.