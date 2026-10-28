# Studyplan deployment status

Published and verified on 28 October 2026 at https://studyplan.ardatas.com/.

Project: `/Users/ardatas/Desktop/Projects/studyplan-organizer`, branch `codex/tutorial-calendar`.
Document root: `/home/ardatas/studyplan.ardatas.com`.

The deployed release is `artifacts/studyplan-2026-10-28T03-01-00-342Z.zip`. Its public-files upload archive is `artifacts/studyplan-v2-upload.zip`, SHA-256 `a01ca492756f618b6c90d5eab307d5b8755e541d8c46721c7affb39ad3684755`.

All 11 live files match the final local build. All 24 live browser checks and 12 logic tests passed. Upload ZIPs were moved outside the public root and their old URLs return 404. Hosting-generated settings and the personal site were preserved. See [verification](VERIFICATION.md) for evidence and data limitations.

No application deployment step remains. Source commits are local and have not been pushed. HTTPS works; HTTP also serves the app without a forced redirect.

For a future update, follow [deployment instructions](DEPLOYMENT.md), package a fresh build, preserve hosting-generated settings, upload only app files to the dedicated root, then run:

```sh
node scripts/verify-live.mjs
STUDYPLAN_BASE_URL=https://studyplan.ardatas.com/ npm run test:e2e
```

Do not extract obsolete design archives or overwrite `/home/ardatas/public_html`. No credentials or session tokens are stored here.

## Pending NumProg deployment, 28 October 2026

The authenticated Moodle timetable has now been imported from https://www.moodle.tum.de/course/view.php?id=121375. There are 18 active options, including split groups and the unnumbered Thursday 16:00 online tutorial. Cancelled 04b, 10 and 17 are omitted. Moodle explicitly overrides TUMonline reservation times and rooms. Joining links stay on Moodle.

The new local release is `artifacts/studyplan-2026-10-28T04-15-17-267Z.zip`; upload-only file `artifacts/studyplan-v2-upload.zip` has SHA-256 `1ed8a6678e82a909534f6516e5e7f685d33303f739adacba2d47825c7fcdd05f`. An identical convenience copy is `/Users/ardatas/Desktop/studyplan-numprog.zip`. All 13 logic tests and 26 local browser checks passed (24 existing plus two NumProg checks). TypeScript and build passed. Mobile and desktop screenshots are in `artifacts/*-numprog.png`.

Not deployed yet: Safari's native file picker remains disabled despite selecting the archive, refreshing the upload form, and trying the fresh Desktop copy. The user was asked to upload `studyplan-numprog.zip` through the open authenticated cPanel upload tab. The tab targets `/home/ardatas/studyplan.ardatas.com`. After the upload, extract that ZIP in place, move it outside the public root (use a distinct name to preserve the previous archive), then run live file comparison and all browser checks. Update this status only after verified live delivery. No credentials or tokens are saved.
