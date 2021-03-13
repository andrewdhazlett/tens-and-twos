// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck noImplicitAny
import {DealSomeCards} from './DealSomeCards.tsx';
import {Overlay} from './Overlay.tsx';
import React from 'react';

export default {
  title: 'React Playing Cards',
};

export const Example_Poker_Hand = () => <DealSomeCards />;
export const Overlay_On_Anything = () => <Overlay />;
