import { TweenMax } from "gsap/gsap-core";
export const pageFadeIn = (element) => {
  TweenMax.from(element, 1.5, {
    opacity: "0",
    y: "50px",
    ease: "power4.out",
    clearProps: "all",
  });
};

export const toTop = () => {
  window.scrollTo(0, 0);
};
