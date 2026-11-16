# 💻 What You Need to Do

## 1. Discover and load the provided skills

- [ ] Run `npx skills find accessibility` and review what the skill covers before applying it.
- [ ] Run `npx skills find vercel-react-best-practices` and review it.
- [ ] Load both skills into your coding agent and read what they instruct the agent to do.

## 2. Apply the accessibility skill (agent-led, you verify)

- [ ] With the skill loaded, ask the agent to audit the dashboard and propose fixes.
- [ ] Review each proposal; accept only changes you can tie to a real file and skill instruction.
- [ ] Verify outcomes: keyboard reachability on interactive elements, correct `aria-*` / `role` where needed, `alt` text on images/icons, basic contrast on text and controls.
- [ ] Commit with a message that references the `accessibility` skill.

## 3. Apply the vercel-react-best-practices skill (agent-led, you verify)

- [ ] With the skill loaded, ask the agent to audit deployment-oriented frontend patterns and apply fixes.
- [ ] Review proposals against the skill — e.g. `next/image` where appropriate, page metadata, layout-shift and font anti-patterns the skill flags.
- [ ] Run the frontend build command documented in this repo; confirm it passes without new unjustified warnings.
- [ ] Commit with a message that references the `vercel-react-best-practices` skill.

## 4. Explore the ecosystem

- [ ] Run `npx skills find <topic>` for at least two topics relevant to this project (e.g. `performance`, `seo`, `forms`, `typescript`, `testing`).
- [ ] Apply at least one additional skill you consider valuable. Justify the choice in the memory bank or PR notes.

## 5. Write an internal project skill

- [ ] With the agent, identify a gap specific to this inherited repo that community skills do not cover well — e.g. commit message conventions, deployment steps for this dashboard, testing/QA checks before merge, data-formatting rules, API usage patterns, or dashboard-specific UI conventions discovered in the codebase.
- [ ] Have the agent draft a skill file; you refine it to class structure: clear objective, defined inputs, expected output, acceptance criteria.
- [ ] Save it under `.skills/` and load it into the agent to verify it produces actionable guidance for a real task on this repo.

## 6. Update the memory bank

- [ ] Update `memory-bank/progress.md` (or equivalent) with: skills applied, verified changes, ecosystem skill chosen (and why), and the internal skill you authored.

> ⚠️ IMPORTANT: Do not rewrite the dashboard from scratch. Targeted improvement via skills — every change traceable to a skill instruction. You verify; the agent implements.