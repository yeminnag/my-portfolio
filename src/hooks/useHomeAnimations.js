import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrambleTextRef } from './useScrambleText';
import { killAllScrollTriggers } from '../utils/scrollTriggerCleanup';

gsap.registerPlugin(ScrollTrigger);

export function useHomeAnimations() {
  const wrapperRef = useRef(null);
  useScrambleTextRef(wrapperRef);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    gsap.set(wrapper, { zIndex: 1 });

    const tween = gsap.to(wrapper, {
      x: () => -((wrapper.scrollWidth - window.innerWidth) * 1.3),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${wrapper.scrollWidth}`,
        scrub: true,
        pin: true,
        pinReparent: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill(true);
      tween.kill();
      gsap.set(wrapper, { clearProps: 'transform,position,top,left,width,height,zIndex' });
      killAllScrollTriggers();
      ScrollTrigger.refresh();
    };
  }, []);

  return wrapperRef;
}
