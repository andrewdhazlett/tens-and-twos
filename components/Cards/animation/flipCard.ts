import {Callback, TweenTarget, gsap} from 'gsap';

const duration = 1;

const setToHidden = (card: TweenTarget, callback: Callback) => {
  gsap.set(card, {
    rotationY: 90,
    onComplete: callback,
  });
};

const setToShown = (card: TweenTarget, callback: Callback) => {
  gsap.set(card, {
    rotationY: 0,
    onComplete: callback,
  });
};

const hide = (card: TweenTarget, callback: Callback) => {
  gsap.to(card, {
    duration: 0.5 * duration,
    rotationY: -90,
    onComplete: callback,
  });
};

const show = (card: TweenTarget, callback: Callback) => {
  gsap.to(card, {
    duration: 0.5 * duration,
    rotationY: 0,
    onComplete: callback,
  });
};

export const flipCard = (
  animation: string,
  card: TweenTarget,
  callback = () => {}
) => {
  if (typeof document === 'undefined') return null;
  switch (animation) {
    case 'setToShown':
      return setToShown(card, callback);
    case 'setToHidden':
      return setToHidden(card, callback);
    case 'hide':
      return hide(card, callback);
    case 'show':
      return show(card, callback);
    default:
      return null;
  }
};
