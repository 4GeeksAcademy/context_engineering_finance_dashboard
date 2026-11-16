# 🎯 Your challenge

You continue on the same inherited financial dashboard from the context project. You already left it agent-ready: a verified `memory-bank`, rules under `.agents/rules`, and a working local setup you discovered with your coding agent. The app runs. Data loads, charts render. Your tech lead reviewed your stewardship work and left a comment:

> "Good foundation. Before we merge the next changes, raise the bar on two fronts: accessibility and deployment best practices. I'm sharing two skills you can load directly into your coding agent — they'll guide the audit and fixes without you memorizing every rule. Once applied, explore the skills ecosystem and see what else fits this repo. Then capture one internal skill the team will reuse here — commits, deployment, testing, or something specific to this dashboard. Document what you learned."

Professional teams scale quality this way: reusable instruction packs loaded into agents, applied consistently on inherited codebases — not checklists copied from memory.

> Stack-agnostic means your prior knowledge, not the project's stack. This dashboard has a predefined stack — you documented it in the context project `memory-bank`. The assigned skills (`accessibility`, `vercel-react-best-practices`) match that stack. You do not need to already know Next.js, Vercel deployment patterns, or accessibility APIs. Load the skill, let the agent apply it, and verify outcomes in the running app and build. The agent applies the skill; you drive, verify results against repo evidence, and reject changes that do not match what the skill and codebase support.

## What is an agent skill?

An agent skill is a structured, self-contained instruction set that tells a coding agent how to perform a specific task — what to look for, what patterns to apply, what to avoid, and how to verify the result. Skills are composable: combine several small, focused skills for compound improvement without one massive prompt. The ecosystem at [skills.sh](https://skills.sh/) hosts community-maintained skills ready to load. A skill is only as good as how clearly it defines objective, inputs, outputs, and acceptance criteria. You will experience that today — including when you author your own.

## How you work (every phase)

1. Load the skill, then let the agent audit and propose changes — do not hand-fix from this README alone.
2. Ask the agent to cite files and explain each change before accepting it.
3. Verify outcomes in the running app and with the build/test command your `memory-bank` or repo scripts document.
4. Keep changes traceable to a skill (commit message or PR notes).
5. Update `memory-bank` when the repo's quality baseline or workflow changes.

Your tech lead has shared the following instructions:

#### Accessibility (`accessibility`)

Apply the `accessibility` skill to the dashboard. Goal: people using assistive technologies — screen readers, keyboard navigation, high-contrast modes — can use the product without friction. The skill guides the agent to audit and fix common issues: missing `aria-label` attributes, poor focus management, missing `alt` text, and low-contrast interactive elements.

#### Vercel + React Best Practices (`vercel-react-best-practices`)

Apply the `vercel-react-best-practices` skill. Covers deployment-ready patterns: correct use of `next/image`, `next/font`, avoiding layout shift, proper metadata per page, and anti-patterns that hurt Lighthouse scores on Vercel deployments.

#### Exploring the ecosystem

To discover what else is available without guessing names, run:

```bash
npx skills find <topic>