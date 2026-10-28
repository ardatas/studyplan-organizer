# Resume Studyplan deployment

Status on 28 October 2026: **revised build tested and packaged; not published**.

## Current deliverables

Project: `/Users/ardatas/Desktop/Projects/studyplan-organizer`, branch `codex/tutorial-calendar`.

- Local production preview: http://127.0.0.1:4173/ (restart with `npm run preview -- --port 4173` if needed).
- Correct upload: `artifacts/studyplan-v2-upload.zip`.
- SHA-256: `041a4224aebe70823acfd990660c8892f03bff41f7cc780d7dd648db1e557f5b`.
- Release: `artifacts/studyplan-2026-10-28T01-19-19-583Z.zip`.
- Screenshots: `artifacts/preview-desktop-v2.png`, `preview-mobile-v2.png`, `detail-mobile-v2.png`, `webkit-mobile-mobile-week-v2.png`.
- 12 core tests and 20 browser tests pass. Mobile Week fix supports readable horizontally scrolling columns below 901px; desktop retains five-day fit. Focused tests cover 320/390/768/1024px in Chromium and WebKit.
- Local commits are not pushed. Do not infer remote source publication.

## Confirmed hosting state

User authorized `studyplan.ardatas.com`, created with separate root `/home/ardatas/studyplan.ardatas.com`. Validated HTTPS; root currently 403. Personal homepage 200.

Old purple upload `studyplan-upload.zip` was moved via cPanel to account home (`/` in the relative destination field). Old public URL now 404. Do not extract that obsolete release. The v2 archive has not uploaded: its public URL is 404.

Safari access briefly recovered, then the upload button failed with `elementHasNoFrame` and coordinate fallback failed with `noWindowsAvailable`. The correct cPanel upload tab is open. Stop retrying until usable window access returns.

## Remaining steps when Safari is accessible

1. Reconnect using computer-use tools and fresh observations. No saved session URLs or stale indices.
2. Use the existing upload page targeting `/home/ardatas/studyplan.ardatas.com`. Upload only `studyplan-v2-upload.zip` from the local artifacts folder.
3. Verify uploaded bytes, then extract exactly into the dedicated document root. Confirm `index.html`, `assets/`, `licenses/`, `favicon.svg`; preserve `.htaccess`, `.user.ini`, `php.ini`.
4. Move the v2 ZIP outside public roots after checking the destination is unused. Do not empty Trash or modify unrelated files.
5. Enable HTTPS redirect only for Studyplan if available, preserving personal-domain settings.
6. Run `node scripts/verify-live.mjs` and `STUDYPLAN_BASE_URL=https://studyplan.ardatas.com/ npm run test:e2e`. Verify live screenshots/shared preview/downloads without importing into a calendar account.
7. Update verification and delivery status with actual results; do not call upload success publication.

No credentials or session tokens are stored here.
