// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck noImplicitAny
// globals document
import {gsap, TweenTarget} from 'gsap';

const duration = 1;

const initCard = (card: TweenTarget, callback) => {
  gsap.set(card, {
    opacity: 1,
    scale: 0.25,
    rotation: -30,
    x: -100,
    y: -150,
    onComplete: callback,
  });
};

const muckCard = (card, callback) => {
  gsap.to(card, {
    duration: 1 * duration,
    scale: 0.25,
    rotation: -30,
    x: -150,
    y: -200,
    onComplete: callback,
  });
};

const dealRiverFirst = (card, callback) => {
  gsap.to(card, {
    rotation: 0,
    duration: 1 * duration,
    x: 155,
    y: -75,
    scale: 0.33,
    onComplete: callback,
  });
};

const dealRiverSecond = (card, callback) => {
  gsap.to(card, {
    rotation: 0,
    duration: 1 * duration,
    x: 225,
    y: -75,
    scale: 0.33,
    onComplete: callback,
  });
};

const dealFlopThird = (card, callback) => {
  gsap.to(card, {
    rotation: 0,
    duration: 1 * duration,
    x: 85,
    y: -75,
    scale: 0.33,
    onComplete: callback,
  });
};

const dealFlopSecond = (card, callback) => {
  gsap.to(card, {
    rotation: 0,
    duration: 1 * duration,
    x: 15,
    y: -75,
    scale: 0.33,
    onComplete: callback,
  });
};

const dealFlopFirst = (card, callback) => {
  gsap.to(card, {
    rotation: 0,
    duration: 1 * duration,
    x: -55,
    y: -75,
    scale: 0.33,
    onComplete: callback,
  });
};

const makeVisible = (card, callback) => {
  gsap.set(card, {
    opacity: 1,
    onComplete: callback,
  });
};

const dealFirst = (card, callback) => {
  gsap.to(card, {
    rotation: 0,
    duration: 1 * duration,
    x: -10,
    y: 110,
    scale: 0.8,
    onComplete: callback,
  });
};

const dealSecond = (card, callback) => {
  gsap.to(card, {
    rotation: 0,
    duration: 1 * duration,
    x: 160,
    y: 110,
    scale: 0.8,
    onComplete: callback,
  });
};

const placeInDeck = (card, callback) => {
  gsap.set(card, {
    scale: 0.25,
    x: -75,
    y: -100,
    onComplete: callback,
  });
};

const dealFirstCard = (card, callback) => {
  gsap.to(card, {
    duration: 0.5 * duration,
    x: 275,
    y: 165,
    scale: 0.75,
    onComplete: callback,
  });
};

export const moveTo = (
  animation: string,
  card: string,
  callback = () => {}
) => {
  if (typeof document === 'undefined') return null;
  switch (animation) {
    case 'makeVisible':
      return makeVisible(card, callback);

    case 'dealSecond':
      return dealSecond(card, callback);

    case 'dealFirst':
      return dealFirst(card, callback);

    case 'initCard':
      return initCard(card, callback);

    case 'placeInDeck':
      return placeInDeck(card, callback);

    case 'dealFirstCard':
      return dealFirstCard(card, callback);

    case 'dealFlopFirst':
      return dealFlopFirst(card, callback);

    case 'dealFlopSecond':
      return dealFlopSecond(card, callback);

    case 'dealFlopThird':
      return dealFlopThird(card, callback);

    case 'dealRiverFirst':
      return dealRiverFirst(card, callback);

    case 'dealRiverSecond':
      return dealRiverSecond(card, callback);

    case 'muckCard':
      return muckCard(card, callback);

    default: {
      return null;
    }
  }
};
