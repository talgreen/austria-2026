# Review Context

**PR**: feat(ci): per-pipeline Slack alerts with stage breakdown and fixed Allure links
**Type**: refactor (CI workflow) — label `avgen`
**Files Changed**: 1 (`.github/workflows/slack-pipeline-alert.yml`)

## Requirements
No external Jira ticket (PR carries "Missing Jira Ticket" label). Intent from PR description:

Redesigns the Slack pipeline failure alert workflow from a commit-based grouping model to **one separate message per pipeline**, with richer per-stage breakdown in thread replies. Supersedes PR #51733.

Key changes:
- Remove cache grouping (anti-race delay, restore-cache, save-cache). Each pipeline posts its own independent Slack message, no shared state.
- Main message: title `*<Pipeline Display Name>* | PROD 🔴 — Deployment Failed`; fields Branch, Deployed by (@mention), Run link.
- Multi-stage pipelines (MC Console, CM Console, Dispatcher, ValidationMonitor): `Failed stages: preview · weekly · crosssystem` flat list.
- Single-stage pipelines (AvGen Service, MC Service, NuGet builds): `Reason: automation tests failed / build failed / deployment failed`.
- Thread replies: one reply per failing stage — Failed steps, Test Failures (parsed from job logs), Error annotations, Allure Report link.
- Allure link fix: removed 60+ gh-pages getContent API calls that raced the report publish; replaced with direct URL construction via hardcoded `workflow -> allureDir` map.
- From PR #51733: `per_page: 100` on jobs list (fixes truncation at 60+ jobs), job `id` in details, removed GitHub App token step, email resolution via commit scan (last 10 commits) for @mention, detailed test failure log parsing.

**Review calibration**: This is a CI/CD GitHub Actions workflow (YAML + embedded actions/github-script JS). Align review to the stated intent. Focus on logic correctness of the embedded JavaScript, GitHub Actions expression/context usage, race conditions, error handling in API calls, and the workflow -> allureDir map correctness.

## Project Standards
Repo CLAUDE.md is C#/.NET monorepo focused - not directly applicable to this workflow YAML. No workflow-specific standards provided.

## Changed Files
- `.github/workflows/slack-pipeline-alert.yml` (Modified)

## Diff
**Read the full diff from: `.claude/cr-results/PR-53298/full-diff.txt`**

## Source Files
Source files at: `.claude/cr-results/PR-53298/source/` - read from here, not from local disk. Available: `.github/workflows/slack-pipeline-alert.yml` (full file). Read the full file for complete context on the embedded JS logic.

## Partial Context
All changed files fetched in full.
