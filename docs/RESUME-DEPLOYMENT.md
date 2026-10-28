# Resume Studyplan deployment

Status on 28 October 2026: **revised build tested and packaged; not published**.

## Current deliverables

Project: `/Users/ardatas/Desktop/Projects/studyplan-organizer`, branch `codex/tutorial-calendar`.

- Local production preview: http://127.0.0.1:4173/ (restart with `npm run preview -- --port 4173` if needed).
- Correct upload: `artifacts/studyplan-v2-upload.zip`.
- SHA-256: `c808b7f3edcd5f1f66d77781668d8eed70b18bfd096ae4888f01c33192adc2fa`.
- Release: `artifacts/studyplan-2026-10-28T02-07-59-458Z.zip`.
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

## Additional table padding

Increased outer timetable padding to 24px on desktop and 12px on mobile, increased day-header height and session-card padding, and retained full-day fit. The first regression run passed 20/22 checks; a tablet-width adjustment resolved the two column-width failures. All six affected layout checks then passed in Chromium and WebKit.

## Prominent section switch

Renamed primary modes to Find tutorials and My plan. Increased button size, type weight and padding; added desktop icons, a high-contrast active fill and a larger plan count. Mobile buttons retain comfortable 48px touch targets. Production build and all 22 browser checks pass, including full-day fit and 320px layout.

## Side-by-side sessions

Overlapping sessions now render directly in separate proportional lanes inside each time box. Each starts/ends at its sourced time, retains its course colour and opens details directly. Narrow lanes use compact course/group labels with full hover and accessible names. The former overlap picker was removed. All 24 browser checks passed; after a short-screen refinement, the eight affected layout/interaction checks passed again. Tests verify every event is represented, bounds are respected, concurrent lanes do not intersect, keyboard details/focus return work, and the full day remains visible. Desktop and mobile screenshots inspected.

## Crowded-slot readability

Removed rotated/wrapped course text. Compact cards show a horizontal course code and a larger high-contrast group number or letter, with stronger coloured top edges. The narrowest lanes use DB/OS/IT/AN codes; full course, time, tutor and room remain in hover/accessibility labels and clickable details. Build and all eight affected desktop/mobile browser checks passed. Desktop screenshot visually inspected.
