# Verification — 28 October 2026

## Revised local production build

- TypeScript and Vite production build passed; release marker is `viewport-v2`.
- 12 logic tests passed, including all 107 sourced slots, Berlin DST, source exceptions, assembly suspensions, overlap grouping, plan parsing and ICS parsing/UTF-8 folding.
- 20 browser tests passed across desktop Chromium and mobile WebKit. Coverage includes selection, persisted plan and course/search/type filters, guarded reset, safe shared previews, unavailable/corrupt storage, compact detail keyboard/outside dismissal and focus return, actual ICS downloads, exclusions, provisional export, calendar views and range navigation.
- Desktop Week fits all five weekdays without horizontal scrolling at 1024 and 1440 pixels. Below 901 pixels, Week uses readable columns in a horizontal scroller with a visible swipe hint and sticky time axis. Tested at 320, 390 and 768 pixels in both engines, including reaching Friday and opening Day view. Default phone view remains Day.
- Dark blue full-viewport layout identifies TUM Computer Science semester 3 and carries the university/unofficial attribution at mobile sizes. Desktop calendar starts at 184px and fills over 75% of the viewport.
- Selected-plan desktop/mobile screenshots, phone Week and compact details were visually inspected. Files use `-v2` names; older purple screenshots are obsolete.
- Revised ZIP integrity passed. Upload ZIP SHA-256: `41cdf4e128a051d31507861a60bc531cda3a01fb58b68925db99d1f84f6ba66d`. It excludes hosting-generated `.htaccess`.

## Hosting and publication boundary

The authorized subdomain exists with its separate document root `/home/ardatas/studyplan.ardatas.com`; the personal site uses `/home/ardatas/public_html`. DNS resolves to `31.210.74.51`, with a valid HTTPS certificate.

Safari briefly recovered. File Manager accepted moving the obsolete `studyplan-upload.zip` to the account home outside the public root. Its previous public URL now returns 404. The revised upload page opened for the correct document root, but Select File failed with `elementHasNoFrame`; the screenshot fallback failed with `noWindowsAvailable`. No revised upload or extraction succeeded.

Latest direct HTTPS checks: Studyplan root **403**, old ZIP **404**, revised ZIP **404**, personal homepage **200**. The app is **not live**. Live browser tests and file parity checks remain pending. See [resume instructions](RESUME-DEPLOYMENT.md).

## Limits

No Apple or Google Calendar account was modified. ICS compatibility is supported by parser and real browser download checks, not a personal-account import. GDB dates remain provisional and require export opt-in. Unverified Analysis and GDB lectures are omitted. Course data is a checked snapshot, not a live subscription.

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
