# felschr.com

My personal website, generated from my [Sifa](https://sifa.id) profile.

Built on the [`sifa-page`](https://github.com/singi-labs/sifa-page) scaffold: one
Node script fetches the public profile from the Sifa API and writes a multi-page
static site to `dist/`. See [NOTICE](NOTICE) for upstream attribution.

## Develop

```bash
nix develop          # node 26
npm ci
npm run build        # writes dist/
npm run dev          # build + local preview
```

The profile is identified by DID by default (`SIFA_ID` in `build.mjs`). Override
with environment variables (see `.env.example`):

| Variable    | Default                                | Purpose                          |
| ----------- | -------------------------------------- | -------------------------------- |
| `SIFA_ID`   | `did:plc:cdf642lfvjvoafw4uepycezk`     | Sifa DID or handle to render     |
| `SIFA_BASE` | `https://sifa.id`                      | Sifa API base                    |
| `SITE_URL`  | `https://felschr.com`                  | Canonical URL for metadata       |

## Deploy

`.forgejo/workflows/deploy.yml` builds the site and publishes `dist/` to
[Codeberg Pages](https://codeberg.page) via
[`actions/git-pages`](https://codeberg.org/git-pages/action), served at
`https://felschr.com/`.

### One-time setup

On the Codeberg mirror (`codeberg.org/felschr/felschr.com`):

1. **Enable Actions** — repo *Settings → Units → Overview → Actions*, then save.
2. Make sure the repo is public and `main` (with the workflow) is
   mirrored/pushed to Codeberg.

Because the Codeberg repo is a mirror, syncs do **not** emit a `push` event
(and Forgejo has no mirror event), so the workflow also runs on a daily
schedule and via `workflow_dispatch`. Trigger it manually after the first
mirror sync.

DNS for `felschr.com` (Cloudflare, apex, DNS-only / grey cloud):

| Type | Name                          | Value                                   |
| ---- | ----------------------------- | --------------------------------------- |
| A    | `@`                           | `217.197.84.141`                        |
| AAAA | `@`                           | `2a0a:4580:103f:c0de::2`                |
| TXT  | `_git-pages-forge-allowlist`  | `https://codeberg.org/felschr/felschr.com.git` |

> The apex has ProtonMail MX/TXT records, so a CNAME is not possible; use the
> A/AAAA records above. They replace the current nginx A/AAAA. See the
> [Codeberg Pages custom domain docs](https://docs.codeberg.org/codeberg-pages/using-custom-domain/)
> for details and alternatives (Cloudflare CNAME flattening, `www` redirects).

## `.well-known` endpoints

`felschr.com` previously served `/.well-known/*` (WebFinger, WKD) via nginx.
A static host cannot reverse-proxy, so `static/_redirects` redirects every
`/.well-known/` request to `web.felschr.com`:

```
/.well-known/*  https://web.felschr.com/.well-known/:splat  302
```

`web.felschr.com` serves the dynamic responses (the nginx blocks move there).
git-pages forwards the query string, so `?resource=` (WebFinger) and `?l=`
(WKD) survive.

> WKD clients MUST follow HTTPS redirects
> ([draft-koch §5](https://datatracker.ietf.org/doc/html/draft-koch-openpgp-webkey-service-22#section-5));
> WebFinger clients MAY. Also note clients try WKD advanced mode
> (`openpgpkey.felschr.com`) first and only fall back to direct mode if that
> subdomain does not exist.

## Upstream

This repo started as a copy of
[`sifa-page`](https://github.com/singi-labs/sifa-page) and is rebased onto it.
`upstream` points at the GitHub repo; our changes sit as a single overlay commit
on top of upstream's history.

```bash
scripts/upstream-sync.sh     # fetch + rebase onto upstream/main
git push origin main         # when the rebase is clean
```

`git rerere` is enabled, so recurring conflicts on the same files (`build.mjs`,
`package.json`, `README.md`, `.gitignore`) are resolved automatically after the
first time. To sync unattended, run the script from a timer (e.g. a weekly
systemd user timer) and push when it succeeds.

## License

[MIT](LICENSE) for this repo. Bundled fonts and Sifa assets are covered by
[NOTICE](NOTICE).
