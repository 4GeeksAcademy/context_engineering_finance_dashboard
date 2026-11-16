---
name: pre-merge-checks
description: Run and report the verification checks for this dashboard repo (FastAPI backend + React/Vite frontend) before saying a change is done or opening a PR. Use when finishing any code change, before a merge, or when asked "is this ready", "run the checks", "verify". Windows-friendly, no Docker needed.
---

# Pre-merge checks (financial dashboard)

## Objective
Produce an honest, reproducible verified / not-run report for a change on this repo, and a commit message that
traces to its rule or skill. Never claim "done" on something that was not run.

## Inputs
- The diff: `git diff --stat main...HEAD` (or the files you touched).
- Whether Docker is available (`docker --version`). On this project's Windows machine it is not; do not depend on it.
- Whether the change touches: `backend/`, `frontend/`, or docs only.

## Procedure

### 1. Pick the checks from the diff
| Touched | Run |
|---|---|
| `backend/**` | Check B1 |
| `frontend/**` | Checks F1-F4 |
| Either, plus any change to income/outcome/profit logic | **Both** sides (ARCH-1: `computeKPIs`/`computeMonthlyData` in `frontend/src/lib/financial-utils.ts` and `summarize_movements`/`calculate_net_value` in `backend/app/routes.py` are duplicated; edit and test both) |
| Docs only | None; say "no code checks needed" |

### 2. Environment (Windows, no Docker)
- `python` may be the Microsoft Store stub (TEST-5). Use the launcher: `py -3 -m venv <dir>`, then
  `<dir>/Scripts/python.exe -m pip install fastapi "uvicorn[standard]" pytest httpx`.
  Put the venv outside the repo or in `backend/.venv/` (gitignored). Record the Python version; the Dockerfile uses 3.13.
- Frontend: `cd frontend && npm install` once. The dev server proxies `/api` to `http://backend:8000`, which only resolves under Compose.
  On the host, start the backend (`python -m uvicorn app.main:app --port 8000` from `backend/`) and run the frontend with
  `VITE_API_BASE_URL=http://localhost:8000` (untracked `frontend/.env` or inline). CORS is `*`, so the browser call works.

### 3. Run and quote the result line
| ID | Command (from) | Pass looks like |
|---|---|---|
| B1 | `python -m pytest -q` (`backend/`) | `15 passed` (a `StarletteDeprecationWarning` about `httpx` is a known third-party warning, not yours) |
| F1 | `npm test` (`frontend/`) | `Tests  5 passed (5)` |
| F2 | `npm run lint` (`frontend/`) | no output after `eslint .` |
| F3 | `npx tsc -b` (`frontend/`) | exit code 0, no output |
| F4 | `npm run build` (`frontend/`) | `built in ...` and no `(!)` chunk-size warning (entry JS is about 188 kB) |

Counts change when you add tests: update the baseline you quote (TEST-3: changing the generator's 360-movement count fails
`test_generate_mock_movements_returns_full_year_sorted_data`; update that assertion).

### 4. Manual checks the commands cannot catch
- **Enums (API-1):** if `Category`, `OperationType` or `BusinessType` changed, compare `backend/app/routes.py:11-15` with
  `frontend/src/lib/financial-types.ts:1-3` by eye. Nothing automated catches a mismatch.
- **API shape (API-2):** `App.tsx` casts `response.json()`. After renaming any field, load the dashboard once.
- **Dates (ARCH-4, EDGE-1):** do not hardcode dates in tests (the mock data window follows `date.today()`); do not derive a month
  from `new Date(create_date)` with local getters.
- **Accessibility/perf touched?** Re-run `npx lighthouse http://localhost:5173 --only-categories=accessibility,seo`
  against the running dev server; a score of 100 is a floor, not conformance.
- **Never commit** `frontend/dist/`, `.venv/`, or `.env` (only `frontend/.env.example`). CRLF warnings from git on Windows are harmless.

### 5. Commit message convention
Conventional Commits as in `git log`: `type(scope): summary`, types seen here: `docs`, `fix(a11y)`, `perf`, `feat(seo)`,
`chore(skills)`. Reference the rule or skill that justifies the change (for example `per TEST-1`, `Skill: accessibility`).
One concern per commit. End with the attribution trailer the session requires.

## Expected output
A table in the PR description or `memory-bank/progress.md`:

| Check | Command | Result |
|---|---|---|
| B1 | `python -m pytest -q` | `15 passed` (Python 3.14 venv) |
| F1 | ... | ... |
| ... | ... | `not run: <reason>` |

plus one line per unverified area (for example "Docker Compose path: not run, Docker not installed").

## Where skills live (keep copies in sync)
`AGENTS.md` points agents to `.agents/skills/`; Claude Code only registers skills from `.claude/skills/`. This skill is therefore
copied to `.agents/skills/` (source of truth), `.claude/skills/` and `.skills/`. After editing one, copy it over the others:
`cp -r .agents/skills/pre-merge-checks/. .claude/skills/pre-merge-checks/` and the same for `.skills/pre-merge-checks/`.
Verify with `diff -r .agents/skills/pre-merge-checks .claude/skills/pre-merge-checks` (no output means in sync).
Installed community skills (`accessibility`, `vercel-react-best-practices`, `seo`) are pinned in `skills-lock.json`; mirror them the same way.

## Acceptance criteria
- [ ] Every check that applies to the diff has a quoted result line, or is listed as `not run` with the reason.
- [ ] No result is reported from memory; each came from a command run in this session.
- [ ] Both aggregators were checked if business logic changed (ARCH-1).
- [ ] No build, test or lint output was ignored: any new warning is either fixed or explained.
- [ ] The commit message follows the convention and names its rule or skill.
- [ ] No ignored or secret files are staged (`git status --short` shows no `dist/`, `.venv/`, `.env`).
