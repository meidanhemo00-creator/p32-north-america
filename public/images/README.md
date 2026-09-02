# Temporary section imagery

None of these are final assets. No image-generation tool is available in
this build environment, so these are hand-built procedural SVG scenes
(gradients, generated light/particle fields, simple geometry) — not AI
photographs — standing in until real photography or AI-generated images
are supplied. They're designed to match the brand palette and each
section's approved concept so the site reads as complete rather than
showing empty panels.

To replace any of them: drop a new file at the **same path** (same
filename, any raster or vector format `<img>` can render — jpg/png/webp/svg
all work) and update the `src` in the one call site listed below. No other
code, layout, animation, crop, or mask needs to change — every image is
rendered full-bleed via `object-cover` inside a container the animation
system already controls (blur, clip-path masks, scroll-linked scale/parallax
are all applied to the wrapping element, not the image itself).

| File | Section | Depicts | Used in |
|---|---|---|---|
| `vision-earth-orbit.svg` | The Vision | Earth from orbit at night, city-light grid | `components/Vision.tsx` |
| `gap-industrial.svg` | The Gap in Modern Defense | Dark industrial ceiling, surveillance domes | `components/Gap.tsx` |
| `uniqueness-interchange.svg` | Our Uniqueness | Clean graphic aerial highway interchange (sits behind the animated line-art already in this section) | `components/Uniqueness.tsx` |
| `team-crowd.svg` | A Small Team for Big Challenges | Crowded crosswalk, one still figure among the blur — used twice in the same component (once blurred, once clipped sharp) since the section already applies both treatments via CSS/motion to a single source image | `components/Team.tsx` (both `<SectionImage>` calls) |

`components/SectionImage.tsx` is the shared renderer all four use — a plain
`<img>` with `object-cover`, no logic of its own.
