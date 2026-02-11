# Fix: Videos not loading on Amplify (Chrome) — VR Teleoperation & Model Inference

## Cause

Amplify’s SPA rewrite sends **all** requests to `index.html`. For `/research/g1/*.mp4`, the browser gets HTML instead of the video file. Chrome uses Range requests for video; when it gets a 200/206 with `Content-Type: text/html` and HTML body, it refuses to play. Safari and Arc can still play in some cases, which is why it’s browser‑specific.

## Fix (Amplify Console)

Exclude static media from the SPA rewrite so `.mp4` (and `.webm`) are **not** rewritten to `index.html`.

1. **AWS Amplify Console** → your app → **App settings** → **Rewrites and redirects**.
2. Edit the rule that rewrites everything to `index.html` (the SPA catch‑all).
3. Use a **regex source** that excludes file extensions, and **add `mp4` and `webm`** to the exception list.

Current AWS example excludes: `css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp`  
**Add:** `|mp4|webm|mov` so media files are not rewritten.

### JSON (paste into the Amplify redirects JSON editor)

Replace your existing SPA rewrite with this (single rule that rewrites to index.html **except** for the listed extensions, including `mp4`, `webm`, `mov`):

```json
[
  {
    "source": "<<!/^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp|mp4|webm|mov)$)([^.]+$)/>>",
    "status": "200",
    "target": "/index.html",
    "condition": null
  }
]
```

If you have **multiple** rules (e.g. 404, then SPA), keep their order and only change the SPA rule’s `source` to the regex above (with `mp4|webm|mov` in the negative lookahead).

4. Save and redeploy (or let the next deploy pick up the change).

After this, requests to `/research/g1/teleop-episode_000000.mp4` and `/research/g1/inference_video_*.mp4` will be served as static files with correct `Content-Type: video/mp4` and Range support, and Chrome will play them.
