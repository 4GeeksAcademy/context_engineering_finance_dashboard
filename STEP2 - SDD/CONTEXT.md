# 🎯 Your challenge

You continue on the same inherited financial dashboard from the context project. The client's finance team has feedback on three new capabilities. Before anyone builds a component, your tech lead stops the team:

> "We spec first. Then we build."

A well-written specification defines what the user sees, what data each component needs, and what rules govern every field. If the spec is clear, any developer — or coding agent — can implement it without asking you questions.

> Stack-agnostic means your prior knowledge, not the project's stack. This repo has a predefined frontend and backend. You do not need to already know TypeScript interfaces, OpenAPI, or every API field name. Your coding agent explores `/docs` and existing frontend patterns; you drive it, verify every type and rule against live API evidence, and reject guesses.

## How you work (every phase)

1. Ask the agent to explore `/docs` and relevant existing frontend code before drafting specs.
2. For each feature, give the PM outcome as a prompt — let the agent propose types, components, and edge cases.
3. Mark API claims ✅ verified in `/docs` / ❌ wrong / ❓ unverified; correct with the agent.
4. Commit spec artifacts only after verification — separate commits for types, components, and data contract are ideal.
5. Do not implement React components or API calls in this project.

Your product manager shared the following feature requests:

#### Feature 1 — Date range filter on the home dashboard

The finance team wants to focus on specific periods without seeing all historical data at once. Add two date inputs to the top of the home dashboard — a start date and an end date — that filter all the data currently displayed on the page. Dates are sent to the API in `YYYY-MM-DD` format. Both inputs are optional; when empty, the dashboard shows all available data. The available date range (earliest and latest dates in the dataset) must be shown near the inputs as a reference so the user knows what range is valid.

Relevant endpoint: `GET /api/metrics/facets` (to retrieve the available date range) and the filters extension on the existing metrics endpoint.

#### Feature 2 — Anomaly alerts table on the home dashboard

Below the existing charts, add a table that highlights periods where spending spiked unexpectedly. The table has four columns: period, recorded outcome, rolling average of the previous 3 periods, and the percentage increase. The spike threshold is configurable by the user via a numeric input (a ratio between `0.01` and `1.0`, defaulting to `0.3`). If no anomalies are detected for the current threshold, the table must show an explicit empty state message — not just disappear. The table must also respect the date range set in Feature 1 if active.

Relevant endpoint: `GET /api/metrics/alerts?threshold=<ratio>`

#### Feature 3 — B2B vs B2C comparison view

Create a new page in the dashboard for comparing revenue performance between the two business lines: B2B and B2C. The view has two sections side by side. Each section shows a table with the top 5 income categories for that business line, displaying category name, total income, and percentage of the group total. Below both sections, a single chart compares the total income of B2B against B2C visually. The user can filter the comparison by a date range (same `YYYY-MM-DD` format). The available categories for each group must come from the facets endpoint.

Relevant endpoints: `GET /api/metrics/categories/top?operation_type=income&limit=5` and `GET /api/metrics/facets`

Your specifications must be precise enough that a coding agent can build each feature from them alone — because every field name, parameter, and edge case was verified against `/docs`, not invented.