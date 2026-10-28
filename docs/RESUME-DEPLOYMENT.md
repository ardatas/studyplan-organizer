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
