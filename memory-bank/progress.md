# Progress

## 2026-11-16: audit and proposed rule set
- Grouped the findings in `.agents/rules/*` into good and risky, by category (architecture, API, edge cases,
  security, testing, dev environment, style). The rules had no explicit audit; the grouping was derived from each rule's **Why**.
- Turned the risky findings into 16 proposed rules in `.agents/rules/proposed-rules.md` (commit `0025916`).
  Each cites at least one repo fact and names its source rule.

## 2026-11-16: agent skills (branch `feature/agent-skills`)
Found with `npx skills find`, read before installing, pinned in `skills-lock.json`, installed to `.claude/skills/`.

| Skill | Commit | What changed (each tied to a skill instruction) | Verified by |
|---|---|---|---|
| `accessibility` (addyosmani/web-quality-skills) | `c08bd92` | Page title (2.4.2); chart `title`/`desc` so the two focusable `role="application"` SVGs have a name (1.1, 4.1.2); `CardTitle` renders `h2` (heading structure); error banner `role="alert"` and `lang="es"` (4.1.3, 3.1.2); `:focus-visible` ring token and `prefers-reduced-motion` block (2.4.7, 1.4.11, 2.3) | Lighthouse a11y 100 before and after (floor only); headless DOM dump before/after; contrast computed from CSS tokens (focus ring was about 2.84:1 at 50% alpha, now 4.68:1) |
| `vercel-react-best-practices` (vercel-labs/agent-skills) | `ab87e5c` | Chart components `React.lazy` + `Suspense` (`bundle-dynamic-imports`; Vite equivalent of `next/dynamic`); `ChartSkeleton` with the same dimensions | `npm run build`: entry JS 584.47 kB to 187.82 kB (gzip 175.26 to 59.87 kB); the >500 kB chunk warning is gone; charts still render in the DOM dump |
| `seo` (addyosmani/web-quality-skills), chosen from the ecosystem | `cd11e4d` | Meta description and a valid `robots.txt` (allow all) | Lighthouse SEO 0.82 to 1.0 (failures were `meta-description`, `robots-txt`) |

**Why `seo`:** the tech lead asked for page metadata and the Vercel skill has none for non-Next apps; Lighthouse showed two concrete
SEO failures. Topics searched: `seo`, `performance`, `typescript`, `testing`.

**Not applied, with reason:** `next/image`, `next/font`, Next metadata (the repo has no `next` and no `<img>`); `bundle-barrel-imports`
(its fix is a Next config option; Vite tree-shakes `lucide-react`); `js-combine-iterations` (360 rows, would touch tested logic);
skip link (single page, no repeated navigation); `noindex` (owner decision, see below).

**Internal skill:** `.skills/pre-merge-checks/SKILL.md` (commit `bf210ef`): verified-or-not-run report for this repo, Windows setup
without Docker, check commands with baselines, commit convention. Exercised on this branch: pytest 15 passed (Python 3.14 venv,
FastAPI 0.163.1, one third-party `httpx` deprecation warning), vitest 5 passed, lint clean, `tsc -b` exit 0, build clean.

**Not verified:** keyboard navigation and screen-reader behavior were not run by hand (the Chrome tool lost its tab group three times,
so the DOM was inspected headlessly); whether the chart `<title>` is announced as the accessible name is unconfirmed.
Recharts line animations are JavaScript and are not covered by the reduced-motion CSS.

**Open for the owner:** (1) should the dashboard be `noindex`? (2) Resolved: skills are mirrored in `.agents/skills/` (source of truth, what `AGENTS.md` points to),
`.claude/skills/` (the only place Claude Code registers skills from) and, for `pre-merge-checks`, `.skills/` (the plan's path).
Sync rule is in the skill itself. (3) Resolved: the three `memory-bank/features/` files were restored, not deleted.
`noindex` was left out on purpose (not required in step 3).

## Status
- Proposed only. Nothing is adopted, enforced or applied to code. The README index in `.agents/rules/` does not list the file.
- Facts were taken from the existing rule files, not re-run. Docker items (DEV-1, DEV-3, SEC-2) remain "not run".

## Next priorities
Ranked by risk. "Resolved when" is the observable result that closes the item.

| # | Gap | Source | Next step | Resolved when |
|---|---|---|---|---|
| 1 | CORS `*` with credentials | SEC-1, P-SEC-1 | Restrict origins in `backend/app/main.py:9-10` | The `curl -H "Origin: http://evil.example"` check prints no allow-origin |
| 2 | Enum drift not caught by any test | API-1, P-API-1 | Add a backend/frontend enum parity test | Adding `"tax"` to the backend only makes a test fail |
| 3 | Month bucketing shifts in negative-UTC zones | EDGE-1, P-EDGE-1 | Use `create_date.slice(0, 7)`; add a TZ vitest case | LA-timezone test expects "Dec 2025" and passes |
| 4 | `npm run build` result not recorded in `SPEC.md` | SPEC baseline, P-TEST-1 | Build now runs clean (see agent-skills section); copy the result line into `SPEC.md` | A result line is quoted in `SPEC.md` |
| 5 | Docker Compose path, HMR in volume, debugger port | verification.md Unverified, DEV-1/3, SEC-2 | Run on a machine with Docker (this one has none) | `docker compose up --build` passes the DEV-1 checks; findings recorded |
| 6 | Backend dependencies unpinned | SPEC "Not established" | Pin versions from the local run (FastAPI 0.162.5) and list `pydantic` | `requirements.txt` has pins; pytest still 15 passed |
| 7 | No CI | SPEC known gaps | Add a workflow running the four TEST-1 checks | A tracked pipeline file exists and runs green |
| 8 | Stale header, empty-input crash, `/metrics` ignores `business_type` | EDGE-2, EDGE-3, ARCH-3 | Fix each with a regression test, per the rule | Matching tests added; entries removed from `known-edge-cases.md` |
| 9 | Duplicated aggregation (client and server) | ARCH-1, P-ARCH-1 | Decide: keep both in sync or fetch `/summary` | Decision recorded here; code or rule updated |
| 10 | Rule adoption | proposed-rules.md | Move accepted rules to topic files with IDs; list in README index | `.agents/rules/README.md` links them |

Items with no owner decision yet: deployment target and product goals (SPEC "Not established"). The repo states
neither, so ask the project owner before planning around them.
