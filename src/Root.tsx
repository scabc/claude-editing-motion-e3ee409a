import React from 'react';
import {Composition} from 'remotion';
import {EditingMotion} from './EditingMotion';
export const Root = () => <Composition id="EditingMotion" component={EditingMotion} width={1280} height={720} fps={30} durationInFrames={900}/>;
