#!/usr/bin/env bash
#
# Rebase this fork onto upstream sifa-page.
#
# Usage: scripts/upstream-sync.sh [branch]
#
# Fetches upstream/main, rebases the given branch (default: main) onto it and
# exits non-zero on conflict, leaving the rebase in place for manual
# resolution. On success, push with: git push origin <branch>
set -euo pipefail

upstream_url="https://github.com/singi-labs/sifa-page.git"
branch="${1:-main}"

if ! git remote get-url upstream >/dev/null 2>&1; then
  git remote add upstream "$upstream_url"
fi

git fetch upstream main
git rebase upstream/main "$branch"
