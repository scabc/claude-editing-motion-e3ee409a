# Reference analysis

## Format and composition

The reference has a 1280 × 720 H.264 video stream at 30 fps and AAC audio. Container duration is 30.058 seconds. The recreation uses 900 frames / 30 seconds; the last 58 milliseconds of the source container are not used.

The full editor has a thin title bar, a library on the left, a vertical phone preview in the upper center, four sliders on the right, and a three-track timeline in the lower half. Camera push-ins crop the application window during editing. The ending restores the full editor, fades it back, enlarges the phone and adds a taped paper note on the left.

## Color, type and illustration

- Warm off-white paper (`#f4f1e8`) and irregular dark ink (`#302e28`).
- Mustard yellow active tabs and text (`#f3ce68`), mint controls (`#79bdb6`), lilac audio track and pink/red playhead.
- Terracotta square character with thin limbs, dot/arc eyes and pink cheeks.
- Handwritten Chinese UI labels, outlined yellow headlines, informal Latin lettering.
- The exact reference font is unknown. A bundled OFL handwritten Chinese font supplies a reproducible approximation across machines.
- The source phone illustrations are retained as image crops; the disco preview is rebuilt with SVG gradients, perspective tiles, rays, mirror ball and a frame-driven character.

## Timing study

| Seconds | Reference action | Recreated motion |
| --- | --- | --- |
| 0–1 | Code window, editor appears | Code card shrinks and fades; editor scales in |
| 1–4 | UI draws in; assets dragged to timeline | Staged panels, long character arm, progressively populated clips |
| 4–6 | Music and playback, ramen preview | Waveform appears, playhead advances, preview switches |
| 6–9 | Out-of-focus dead section is cut | Blur overlay, speech bubble, hatched segment removal, cut callouts |
| 9–12 | Rotation, page and glitch transitions | Effects library, rotation, transition badges and moving arm |
| 12–16 | Text addition, undo, correction | Caption track and phone caption, Ctrl+Z, corrected stamp |
| 16–20 | Flash, saturation and zoom adjustments | Slider changes, camera shift, long arm, saturation spike and shake |
| 20–24 | Music beats and dancing | Procedural dance, waveform, beat markers and playhead |
| 24–27 | Export progress, completion | Export arm, progress text and completion indicator |
| 27–30 | Social preview and Opus note | Faded editor, enlarged phone, typed note, final headline and confetti |

## Fidelity boundaries

The original has more bespoke hand-drawn marks, nuanced asset dragging paths and pose variations. Those are reconstructed with CSS/SVG geometry and piecewise frame interpolation. The visual style and sequence are reproduced, with intentionally transparent limits: camera framing, lettering and individual actions are approximate, rather than an exact frame-by-frame copy.

## Revision 2: visual fidelity correction

The first revision was rejected for poor resemblance. Its principal errors were camera scale/translation, an overly heavy substitute font, redrawn character proportions, simplified phone artwork and coarse choreography.

Revision 2 uses source-art layers to preserve the original drawing and handwriting. It measures the camera from stable UI borders rather than estimating it. Examples of the measured camera scale are 1.12 at 3 seconds, 1.30 at 6 seconds, 1.28 at 10 seconds, about 1.35 at 13 seconds and 1.40 at 17 seconds. The rightward adjustment shot requires a canonical x translation of approximately -512 pixels at 17 seconds.

Phone and mascot illustration animation are retained as isolated sprite atlases. This is deliberately documented as a hybrid reconstruction; those poses are not newly hand-keyed vector drawings. The editor shell is static source artwork. Timeline state, clips, trimming, waveform reveal, cursor, camera, sliders and overlay timing are assembled in Remotion.

Matched-time comparison images are the visual acceptance evidence. A successful render or API binding alone does not establish resemblance to the reference.
