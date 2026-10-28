# Verification — 28 October 2026

## Local production build

- TypeScript and Vite production build passed.
- 11 core tests passed, including Berlin DST conversion, source exceptions, assembly suspensions, conflict layout, plan parsing, UTF-8 line folding and ICS parsing through ical.js.
- 14 browser tests passed across desktop Chromium and iPhone-sized WebKit. Coverage includes all calendar views, selection/removal, persistence, source details, search, actual overlap warnings, shared previews without overwriting local storage, downloads and their contents, date exclusions, provisional export opt-in, 320px overflow, live time, and range navigation.
- Desktop and mobile screenshots were inspected for readable time/course/tutor/room blocks.
- Release SHA-256 manifest and ZIP integrity verified. The upload-only ZIP omits the hosting-generated `.htaccess`.
- npm audit reported zero vulnerabilities at installation.

## Hosting setup

cPanel confirmed five available subdomains. Created `studyplan.ardatas.com` with document root `/home/ardatas/studyplan.ardatas.com`; the personal site's root remains `/home/ardatas/public_html`.

DNS resolves the subdomain to `31.210.74.51`. HTTPS responds with certificate validation enabled. Initial document root contained only hosting-generated PHP settings, which are preserved.

Live application checks are recorded after extraction and must not be inferred from upload success.

## Limits

No Apple Calendar or Google Calendar account was modified. ICS compatibility is supported by standards/parser checks and real browser downloads, not an end-to-end personal-account import. GDB dated sessions remain provisional. Analysis and GDB lectures remain unverified and omitted. The course snapshot is not a live subscription.

## Publication boundary

The final release ZIP uploaded successfully and its public bytes matched SHA-256 `0eca674f2998a7da87dea6797da99b9393e3e70e1c917dbb5103ec63ffe257e3`. Extraction remains pending because Safari window control became unavailable. Studyplan root still returns HTTP 403; the personal homepage returns HTTP 200. No live app interaction tests have been claimed. See [resume record](RESUME-DEPLOYMENT.md).
