import React from 'react';
import {Composition} from 'remotion';
import {AccurateMotion} from './AccurateMotion';
export const Root = () => <Composition id="EditingMotion" component={AccurateMotion} width={1280} height={720} fps={30} durationInFrames={900}/>;
