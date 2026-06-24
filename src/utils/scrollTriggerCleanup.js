import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
  document.querySelectorAll('.pin-spacer').forEach((el) => el.remove());
  document.querySelectorAll('body > .about-wrapper').forEach((el) => el.remove());
}
