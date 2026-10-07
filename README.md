# Claude 剪视频过程 — Remotion recreation

A 30-second, 1280 × 720, 30 fps recreation of the hand-drawn editing workflow in MotionFace recording `e3ee409a-50f7-4b4a-af27-288226e47a57`.

The editor, timeline, waveform, playhead, character, extended arms, adjustments, captions, camera moves, export state, final note and dancing scene are rendered by React / SVG / CSS, driven solely by the current frame. This is a component-based visual recreation, not a wrapper that plays the original recording.

## Run

Node.js 22 or newer is recommended.

```sh
npm ci
npm start
```

Open the local URL printed by Remotion Studio, select **EditingMotion**, and play or scrub the timeline.

## Render

```sh
npm run typecheck
npm run render
```

The video is written to `out/editing-motion.mp4`. The first render downloads Remotion's Chrome Headless Shell. Rendering requires an internet connection for that initial download; all composition assets are local afterwards.

```sh
npm run still
npx remotion still src/index.ts EditingMotion out/ending.png --frame=870
```

## Source map

- `src/Root.tsx`: resolution, frame rate and 900-frame composition.
- `src/EditingMotion.tsx`: Library, Adjust, Phone, DanceScene, Timeline, Robot and scene choreography.
- `src/style.css`: cream paper, ink outlines, handwritten typography and UI styling.
- `public/assets`: illustration crops, reference audio and locally bundled font.
- `ANALYSIS.md`: visual study, timing and recreation boundaries.

## Assets and attribution

City, ramen, dog and dance thumbnail illustrations were cropped from the user-supplied reference recording. `soundtrack.m4a` is the reference's audio track. The original full video is not included. The visible text “Opus 5.5” is reproduced as reference artwork, not a claim about the model used to build this project.

The handwritten font **Ma Shan Zheng** is distributed under the SIL Open Font License; its license is in `public/assets/FONT-LICENSE.txt`. Font source: https://github.com/google/fonts/tree/main/ofl/mashanzheng.

Reference page: https://motionface.cc/?recording=e3ee409a-50f7-4b4a-af27-288226e47a57.

The code and derived media are provided for this requested recreation. No rights to third-party illustration or audio are implied. No authentication tokens or expiring download URLs are included.

## Validation

The implementation was typechecked and rendered through Remotion locally. Key rendered frames were visually inspected against the reference. The result preserves the subject, sequence, palette and editing metaphor; exact pen strokes, the original font and every intermediate pose are approximated. No pixel-perfect equivalence is claimed.

Remotion documentation: https://www.remotion.dev/docs/the-fundamentals.
