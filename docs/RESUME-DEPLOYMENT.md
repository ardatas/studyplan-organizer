# Studyplan deployment status

## Pending selected-session context update

Implemented and locally tested on 28 October 2026. Find tutorials retains selected sessions across filters as translucent, muted cards; overlapping candidates remain in separate lanes and show conflict details. My plan retains its normal styling.

Ready archive: `artifacts/studyplan-2026-10-28T05-54-36-265Z.zip`. Upload-only copy: `/Users/ardatas/Desktop/studyplan-selected-context.zip`, SHA-256 `35ed5c1314e250013c0b098b75d79f3a6c702e9dddb180f4aad21bab426d6f06`.

Validation: 15 logic tests and 28 browser tests passed locally; after the final short-card CSS adjustment, all 4 targeted desktop/mobile context and full-day-fit checks passed. No live files uploaded or extracted. Safari control timed out repeatedly and then returned ScreenCaptureKit error -3812. Resume the upload in cPanel File Manager, extract into the dedicated root while preserving hosting settings, verify live files and browser tests, and move the archive outside the public root.

## Last published release

Published and verified on 28 October 2026 at https://studyplan.ardatas.com/.

Project: `/Users/ardatas/Desktop/Projects/studyplan-organizer`, branch `codex/tutorial-calendar`.
Document root: `/home/ardatas/studyplan.ardatas.com`.

The deployed release is `artifacts/studyplan-2026-10-28T04-15-17-267Z.zip`. Its public-files upload archive is `artifacts/studyplan-v2-upload.zip`, SHA-256 `1ed8a6678e82a909534f6516e5e7f685d33303f739adacba2d47825c7fcdd05f`.

All 11 live files match the final local build. All 26 live browser checks and 13 logic tests passed. Upload ZIPs were moved outside the public root and their old URLs return 404. Hosting-generated settings and the personal site were preserved. See [verification](VERIFICATION.md) for evidence and data limitations.

The NumProg release is complete; the newer context update above remains pending publication. Source commits are local and have not been pushed. HTTPS works; HTTP also serves the app without a forced redirect.

For a future update, follow [deployment instructions](DEPLOYMENT.md), package a fresh build, preserve hosting-generated settings, upload only app files to the dedicated root, then run:

```sh
node scripts/verify-live.mjs
STUDYPLAN_BASE_URL=https://studyplan.ardatas.com/ npm run test:e2e
```

Do not extract obsolete design archives or overwrite `/home/ardatas/public_html`. No credentials or session tokens are stored here.

## NumProg update completed

The authenticated Moodle timetable supplied 18 active tutorial options. This release was uploaded as `studyplan-numprog.zip`, extracted into the dedicated root, then moved to account home. Its old public URL returns 404. All 11 app files matched the local build at 05:46:46 UTC, and all 26 live browser tests passed. Local implementation commit: `096dcce`.

For Safari native upload pickers that leave Upload disabled, switching the picker to List view exposed the selected file's “Open Finder item” accessibility action, which successfully submitted the archive. Refresh cPanel if its file existence check returns 403; do not disable security protections. Use Safari page reload when the File Manager's internal reload stalls. No credentials or tokens are saved.
