# Real P32 photography

Real photographs, not placeholders — sourced from the client's own Google
Drive folder and downsized/re-encoded as JPEG (quality 84, original
1920×1080 resolution preserved) for web delivery. Full-resolution
originals and unused alternates live in `assets/photo-source/` at the repo
root (not deployed — see that folder's README).

These replaced the earlier procedural SVG scenes (`public/images/`, now
removed) that stood in for photography before the client supplied real
images.

| File | Used in | Treatment applied in-component |
|---|---|---|
| `hero-crowd.jpg` | `Hero` — background layer behind the particle field | low opacity, desaturated, slight blur |
| `vision-orbit.jpg` | `Vision` — full-bleed background | scroll-parallax scale, saturate/contrast filter |
| `gap-surveillance.jpg` | `Gap` — full-bleed background | scroll-fade opacity, saturate/contrast filter |
| `uniqueness-highway.jpg` | `Uniqueness` — split-screen panel | animated line-graphic overlay on top |
| `playbook-command.jpg` | `Playbook` — full-bleed background | low opacity, desaturated, dark gradient overlay for text contrast |
| `team-crossing.jpg` | `Team` — blurred backdrop + scroll-revealed sharp focus circle | blur↔sharp scroll transition, color-drift filter |
| `team-detail.jpg` | `Team` — small detail-crop thumbnail | cropped/zoomed via `object-position` + `transform` |
| `contact-skyline.jpg` | `Contact` — full-bleed background | low opacity, desaturated, dark gradient overlay |

Rendered through `components/SectionImage.tsx` (or a direct `<img>` for
Hero/Playbook/Contact's background layers, same component underneath).
