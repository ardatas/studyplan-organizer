# Verification — 28 October 2026

## Revised local production build

- TypeScript and Vite production build passed; release marker is `viewport-v2`.
- 12 logic tests passed, including all 107 sourced slots, Berlin DST, source exceptions, assembly suspensions, overlap grouping, plan parsing and ICS parsing/UTF-8 folding.
- 20 browser tests passed across desktop Chromium and mobile WebKit. Coverage includes selection, persisted plan and course/search/type filters, guarded reset, safe shared previews, unavailable/corrupt storage, compact detail keyboard/outside dismissal and focus return, actual ICS downloads, exclusions, provisional export, calendar views and range navigation.
- Desktop Week fits all five weekdays without horizontal scrolling at 1024 and 1440 pixels. Below 901 pixels, Week uses readable columns in a horizontal scroller with a visible swipe hint and sticky time axis. Tested at 320, 390 and 768 pixels in both engines, including reaching Friday and opening Day view. Default phone view remains Day.
- Dark blue full-viewport layout identifies TUM Computer Science semester 3 and carries the university/unofficial attribution at mobile sizes. Desktop calendar starts at 128px and fills over 75% of the viewport.
- Selected-plan desktop/mobile screenshots, phone Week and compact details were visually inspected. Files use `-v2` names; older purple screenshots are obsolete.
- Revised ZIP integrity passed. Upload ZIP SHA-256: `041a4224aebe70823acfd990660c8892f03bff41f7cc780d7dd648db1e557f5b`. It excludes hosting-generated `.htaccess`.

## Hosting and publication boundary

The authorized subdomain exists with its separate document root `/home/ardatas/studyplan.ardatas.com`; the personal site uses `/home/ardatas/public_html`. DNS resolves to `31.210.74.51`, with a valid HTTPS certificate.

Safari briefly recovered. File Manager accepted moving the obsolete `studyplan-upload.zip` to the account home outside the public root. Its previous public URL now returns 404. The revised upload page opened for the correct document root, but Select File failed with `elementHasNoFrame`; the screenshot fallback failed with `noWindowsAvailable`. No revised upload or extraction succeeded.

Latest direct HTTPS checks: Studyplan root **403**, old ZIP **404**, revised ZIP **404**, personal homepage **200**. The app is **not live**. Live browser tests and file parity checks remain pending. See [resume instructions](RESUME-DEPLOYMENT.md).

## Limits

No Apple or Google Calendar account was modified. ICS compatibility is supported by parser and real browser download checks, not a personal-account import. GDB dates remain provisional and require export opt-in. Unverified Analysis and GDB lectures are omitted. Course data is a checked snapshot, not a live subscription.
