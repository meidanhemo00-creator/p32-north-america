# Real P32 brand assets

Sourced from the client's own Google Drive (the "P32" brand folder), not
recreated or approximated. Original source files: `P32 - LOGO.png` and
`P32 - LOGO + STAR.png`, plus a vector `P32 - STAR.svg`.

These were autocropped to their opaque bounding box and, for the `light`
variants, had the wordmark recolored to white (`#fafafa`) while leaving the
star's original blue untouched — done programmatically so the star's exact
brand color is preserved.

| File | Use |
|---|---|
| `p32-lockup-light.png` | White wordmark + blue star, for dark grounds (used by `Logo` variant="light", the default — nearly every section) |
| `p32-lockup-dark.png` | Near-black wordmark + blue star, for light grounds (`Logo` variant="dark") |
| `p32-wordmark-light.png` / `p32-wordmark-dark.png` | Wordmark only, no star — not currently used but available |
| `p32-star.png` | Star mark alone, used by `LogoMark` (footer) |

Rendered through `components/Logo.tsx`. Still worth getting a true vector
(SVG/AI/EPS) export from the client for the full lockup at some point —
these are high-res PNGs, which is fine at the sizes used on this site but
isn't infinitely scalable the way the source star SVG is.
