import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollAnimationOptions {
  trigger: string | Element;
  animation: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export function useScrollAnimation() {
  const animations: gsap.core.Tween[] = [];

  function animateOnScroll(options: ScrollAnimationOptions) {
    const {
      trigger,
      animation,
      start = "top 80%",
      end = "bottom 20%",
      scrub = false,
    } = options;

    const tween = gsap.from(trigger, {
      ...animation,
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        toggleActions: "play none none reverse",
      },
    });

    animations.push(tween);
    return tween;
  }

  function fadeInUp(selector: string, delay = 0) {
    return animateOnScroll({
      trigger: selector,
      animation: {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay,
        ease: "power2.out",
      },
    });
  }

  function staggerIn(selector: string, stagger = 0.1) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const tween = gsap.from(elements, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: elements[0],
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    animations.push(tween);
    return tween;
  }

  function cleanup() {
    animations.forEach((tween) => tween.kill());
    animations.length = 0;
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  return {
    animateOnScroll,
    fadeInUp,
    staggerIn,
    cleanup,
  };
}