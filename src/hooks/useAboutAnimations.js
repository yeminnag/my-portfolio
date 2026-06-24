import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { killAllScrollTriggers } from '../utils/scrollTriggerCleanup';

gsap.registerPlugin(ScrollTrigger);

export function useAboutAnimations() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const cleanups = [];

    mm.add('(min-width: 901px)', () => {
      const contentTween = gsap.to('.about-content', {
        scale: 2,
        y: '-50%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.profile-wrapper',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      const parallaxTween = gsap.to('.parallax-bg', {
        y: '20%',
        scale: 1.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '.profile-wrapper',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      cleanups.push(() => {
        contentTween.scrollTrigger?.kill(true);
        contentTween.kill();
        parallaxTween.scrollTrigger?.kill(true);
        parallaxTween.kill();
      });
    });

    mm.add('(max-width: 900px)', () => {
      gsap.set('.form-area', { opacity: 1, y: 0 });

      const parallaxTween = gsap.to('.parallax-bg', {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.profile-wrapper',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      cleanups.push(() => {
        parallaxTween.scrollTrigger?.kill(true);
        parallaxTween.kill();
      });
    });

    const listItems = document.querySelectorAll('.about-text li');
    const charTweens = [];

    listItems.forEach((li) => {
      const chars = li.textContent.trim().split('');

      li.innerHTML = chars
        .map((c) => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`)
        .join('');

      gsap.set(li.querySelectorAll('.char'), {
        opacity: 0,
        y: 20,
      });

      const tween = gsap.to(li.querySelectorAll('.char'), {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: li,
          start: 'top 75%',
          end: 'top 55%',
          scrub: true,
        },
      });

      charTweens.push(tween);
    });

    const formTween = gsap.to('.form-area', {
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.profile-wrapper',
        start: '70% bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    return () => {
      mm.revert();
      formTween.scrollTrigger?.kill(true);
      formTween.kill();
      charTweens.forEach((tween) => {
        tween.scrollTrigger?.kill(true);
        tween.kill();
      });
      cleanups.forEach((cleanup) => cleanup());
      killAllScrollTriggers();
      ScrollTrigger.refresh();
    };
  }, []);
}
