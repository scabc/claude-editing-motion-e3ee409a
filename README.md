# Claude 剪视频过程 — Remotion source-art reconstruction

A 30-second, 1280 × 720, 30 fps reconstruction of MotionFace recording `e3ee409a-50f7-4b4a-af27-288226e47a57`.

The second revision replaces the loose redraw with a source-art composition. It preserves the reference's drawing, lettering and character poses, while using Remotion to assemble the editor, tracks, cursor, effects, callouts and measured camera animation.

## Run and render

Use Node.js 22 or newer:

```sh
npm ci
npm start
```

Select **EditingMotion** in Remotion Studio. Render the complete MP4:

```sh
npm run typecheck
npm run render
```

Output: `out/editing-motion.mp4` (900 video frames with AAC audio).

```sh
npm run still
npx remotion still src/index.ts EditingMotion out/ending.png --frame=870
```

The first render downloads Remotion's Chrome Headless Shell. All composition assets are bundled locally; no expiring URLs, API tokens or remote media dependencies are required.

## How this reconstruction works

- `src/AccurateMotion.tsx` assembles the composition. Camera position, drag paths, clips, trimming, transition markers, waveform reveal, playhead, sliders, callouts and final note are separate layers.
- `src/reconstruction-data.json` contains the measured camera transform and sprite atlas coordinates. Camera scale and translation were measured from stationary editor features at three-frame intervals, then interpolated per frame.
- `src/playhead-data.json` contains the measured editing cursor position. It is independent of the recording's wall-clock time.
- `public/reconstruction/editor-shell.webp` is a static, cleaned UI plate; clip tracks and moving foreground elements are separate.
- `public/reconstruction/phone-*.webp` preserves the **phone region only**, as source-art frame sprites, including illustration animation and in-phone captions.
- `public/reconstruction/mascot-*.webp` preserves isolated original mascot poses and arm artwork with transparency.
- The remaining small images contain cropped UI cards, handwriting, clip artwork and callouts.

**This is a hybrid source-art reconstruction, not a fully vector or fully procedural remake.** Phone animation and character poses retain reference pixels as sprite sequences. Their placement and timing are controlled in Remotion. The original full video, full-frame video sequence and a video playback wrapper are not included. To redesign those illustrated assets, replace the relevant atlas art; changing React geometry alone does not redraw them.

## Attribution

Source artwork, handwriting and audio come from the user-provided reference. The displayed “Opus 5.5” is reference text, not a claim about the model used to implement this repository. The repository does not grant rights to third-party artwork or audio.

**Patrick Hand** is bundled under the SIL Open Font License (see `public/reconstruction/FONT-LICENSE.txt`), from https://github.com/google/fonts/tree/main/ofl/patrickhand. Most visible Chinese lettering is preserved from the reference artwork rather than replaced by a different typeface.

Reference page: https://motionface.cc/?recording=e3ee409a-50f7-4b4a-af27-288226e47a57.

## Validation and remaining differences

TypeScript checking, full Remotion rendering and complete MP4 decoding are performed locally. Matched-time comparisons cover the intro, asset placement, cut, transitions, captions, adjustment, export and final card.

The second revision targets the original composition and visual identity. It is not claimed to be pixel-perfect: a few drag trajectories, progress labels, particles and opening UI reveal details remain approximations. Isolated source-art layers can also retain small antialiasing differences at their edges.
