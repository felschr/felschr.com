#!/usr/bin/env bash
#
# Merge upstream sifa-page into this fork, preserving history.
#
# Usage: scripts/upstream-sync.sh [branch]
#
# Fetches upstream/main and merges it into the given branch (default: main),
# creating a merge commit. Exits non-zero on conflict, leaving the merge in
# place for manual resolution. On success, push with: git push origin <branch>
set -euo pipefail

upstream_url="https://github.com/singi-labs/sifa-page.git"
branch="${1:-main}"

if ! git remote get-url upstream >/dev/null 2>&1; then
  git remote add upstream "$upstream_url"
fi

git fetch upstream main
git switch "$branch"
git merge -m 'Merge upstream/main (singi-labs/sifa-page)' upstream/main
