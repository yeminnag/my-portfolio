import { useEffect } from 'react';
import gsap from 'gsap';

export function useNavAnimation() {
  useEffect(() => {
    const buttons = gsap.utils.toArray('.navBtn');
    const cleanups = [];

    buttons.forEach((btn) => {
      const span = btn.querySelector('span');
      const tl = gsap.timeline({ paused: true });

      tl.to(span, { yPercent: -100, duration: 0.2 })
        .set(span, { yPercent: 100 })
        .to(span, { yPercent: 0, duration: 0.2 });

      const onEnter = () => tl.play(0);
      const onLeave = () => tl.reverse();

      btn.addEventListener('mouseenter', onEnter);
      btn.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        btn.removeEventListener('mouseenter', onEnter);
        btn.removeEventListener('mouseleave', onLeave);
        tl.kill();
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  });
}
