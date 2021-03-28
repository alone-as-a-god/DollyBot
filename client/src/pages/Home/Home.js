import { TweenMax } from "gsap/gsap-core";
import React, { useEffect, useRef } from "react";
import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  let home = useRef(null);
  useEffect(() => {
    TweenMax.from(home, 1.5, {
      opacity: "0",
      y: "50px",
      ease: "power4.out",
      clearProps: "all",
    });
  }, []);

  return (
    <div ref={(element) => (home = element)}>
      <Hero />
      <Features />
    </div>
  );
};

export default Home;
