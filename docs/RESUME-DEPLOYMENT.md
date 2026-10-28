# Resume Studyplan deployment

Status on 28 October 2026: **revised build tested and packaged; not published**.

## Current deliverables

Project: `/Users/ardatas/Desktop/Projects/studyplan-organizer`, branch `codex/tutorial-calendar`.

- Local production preview: http://127.0.0.1:4173/ (restart with `npm run preview -- --port 4173` if needed).
- Correct upload: `artifacts/studyplan-v2-upload.zip`.
- SHA-256: `5eecb8dbc71af486d90467bb5352b6c394c756851973f0c2019077f90cc71f29`.
- Release: `artifacts/studyplan-2026-10-28T01-38-52-861Z.zip`.
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

## Course colour update

GDB blue, GBS green, IT Security amber and Analysis rose now apply consistently to calendar cards, overlap badges, tutorial rows, selected states, course filtering and compact details. The course key shows selection counts across courses. Production build and all 20 browser tests passed again. Additional Chromium/WebKit checks selected one tutorial from each course and verified four distinct row colours and all four choices after reload. Screenshots: `artifacts/course-colours-desktop.png` and `artifacts/course-colours-mobile.png`. Hosting remains pending the previously recorded Safari blocker.

## Palette and spacing refinement

Brighter distinct course accents now use deliberate dark surfaces. Added responsive outer gutters, an inset timetable grid, padded day headers and cards, and more space in tutorial rows and controls. Production build and all 20 existing browser checks passed; desktop/mobile screenshots were inspected. Updated release packaged above; publication is still pending.

## Full-day fit

Day and Week now fit 07:00–20:00 into the available table height without vertical scrolling. Event positions and hour lines scale proportionally; short blocks show compact titles and keep complete information in the existing detail dialog. Mobile Week still supports horizontal navigation. Production build and 22 browser tests passed, including full-range visibility and event bounds at 1440×1000, 1024×768, 390×844 and 320×800. Hour-label overlap was additionally checked at 320/390px; desktop and mobile screenshots inspected. Latest mobile screenshot: `artifacts/full-day-mobile.png`.
