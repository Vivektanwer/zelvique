// Loads GSAP, ScrollTrigger and Lenis.
//
// Why "import()" inside a function?
//  1. SSR safety: the server never runs this function, so GSAP and Lenis can never break server rendering.
//  2. Speed: the animation code becomes a separate file that loads AFTER the page is visible.
//
// The libraries are loaded only once. Every later call gets the same result.

let loadingPromise;

export function loadAnimationLibs() {
  if (!loadingPromise) {
    loadingPromise = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([gsapModule, scrollTriggerModule, lenisModule]) => {
      const { gsap } = gsapModule;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger, Lenis: lenisModule.default };
    });
  }
  return loadingPromise;
}

// Other files (like the "scroll to top" hook) need to talk to the smooth scroller,
// so we keep it here after it is created.
let lenisInstance = null;

export function setLenis(lenis) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}
