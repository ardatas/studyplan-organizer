# Resume Studyplan deployment

Status on 28 October 2026: **built, tested, uploaded, not published**.

## Confirmed state

- User selected and authorized `studyplan.ardatas.com`.
- cPanel created it with document root `/home/ardatas/studyplan.ardatas.com`.
- DNS resolves to `31.210.74.51`; HTTPS certificate validation succeeds.
- Uploaded file: `/home/ardatas/studyplan.ardatas.com/studyplan-upload.zip`.
- Upload SHA-256: `0eca674f2998a7da87dea6797da99b9393e3e70e1c917dbb5103ec63ffe257e3`. A public download matched the local file byte for byte.
- The ZIP contains only public app files, with `index.html` at its root. It omits `.htaccess` to preserve cPanel's generated settings.
- Before extraction, the public app root returns HTTP 403; this is not a successful deployment.
- Personal homepage returns HTTP 200. Its local reference checkout remains clean.
- Safari control lost its usable window and reported `noWindowsAvailable`. The user was asked to wake/unlock the Mac and leave File Manager visible. Stop retrying until access returns.

## Remaining steps

1. Reconnect to the existing signed-in Safari cPanel window using computer-use tools. Do not reuse old accessibility indices or session URLs.
2. In File Manager, open `/home/ardatas/studyplan.ardatas.com`. Select `studyplan-upload.zip` and choose **Extract**. Verify the extraction destination is exactly `/home/ardatas/studyplan.ardatas.com`, with no extra enclosing folder.
3. Confirm `index.html`, `favicon.svg`, `assets/` and `licenses/` are present. Preserve the existing `.htaccess`, `.user.ini` and `php.ini`.
4. Move the upload ZIP outside all public roots, for example to `/home/ardatas/studyplan-upload-20261028.zip`, after checking the destination is unused. Do not empty Trash or delete unrelated files.
5. Inspect the subdomain's HTTPS redirect setting in Domains; enable only for Studyplan after confirming a valid certificate. Leave personal-domain settings unchanged.
6. Run the live artifact and browser checks from the local project:

```sh
node scripts/verify-live.mjs
STUDYPLAN_BASE_URL=https://studyplan.ardatas.com/ npm run test:e2e
```

7. Inspect the live screenshots, test a shared URL and ICS download, and update `docs/VERIFICATION.md` with actual outcomes. The tests use isolated browser storage and never import into a personal calendar account.
8. Record the final source-control status and deliver the live URL only once it renders successfully.

## Local deliverables

Project: `/Users/ardatas/Desktop/Projects/studyplan-organizer`.

- Local production preview: http://127.0.0.1:4173/ (running when this record was written; restart with `npm run preview -- --port 4173` if needed).
- Upload archive: `artifacts/studyplan-upload.zip`.
- Release archive: `artifacts/studyplan-2026-10-28T00-49-03-172Z.zip`.
- Desktop sample: `artifacts/preview-desktop.png`.
- Mobile sample: `artifacts/preview-mobile.png`.
- Core tests: 11 passed. Production browser tests: 14 passed across Chromium and mobile WebKit.
- Independent review confirmed the assembly-conflict exclusions and date-range navigation fixes.
- Branch: `codex/tutorial-calendar`. Implementation commit: `3541652`. Local commits have not been pushed; this does not imply remote publication.

No credentials or session tokens are stored in this record.
