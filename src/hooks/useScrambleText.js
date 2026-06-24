import { useEffect } from 'react';
import gsap from 'gsap';

const CHARS = '1234567890';

export function useScrambleText(selector = '.scramble') {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const tweens = [];

    elements.forEach((el) => {
      const original = el.textContent;
      let progress = 0;

      const tween = gsap.to(
        {},
        {
          duration: 1.5,
          onUpdate() {
            progress += 1 / 100;
            el.textContent = original
              .split('')
              .map((char, i) => {
                if (i < original.length * progress) return char;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join('');
          },
          onComplete() {
            el.textContent = original;
          },
        },
      );

      tweens.push(tween);
    });

    return () => tweens.forEach((tween) => tween.kill());
  }, [selector]);
}

export function useScrambleTextRef(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('.scramble');
    const tweens = [];

    elements.forEach((el) => {
      const original = el.textContent;
      let progress = 0;

      const tween = gsap.to(
        {},
        {
          duration: 1.5,
          onUpdate() {
            progress += 1 / 100;
            el.textContent = original
              .split('')
              .map((char, i) => {
                if (i < original.length * progress) return char;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join('');
          },
          onComplete() {
            el.textContent = original;
          },
        },
      );

      tweens.push(tween);
    });

    return () => tweens.forEach((tween) => tween.kill());
  }, [ref]);
}
