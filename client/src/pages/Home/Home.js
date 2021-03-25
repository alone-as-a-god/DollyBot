import { TweenMax } from "gsap/gsap-core";
import React, { useEffect, useRef } from "react";
import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";

const Home = ({ wasOpened, setWasOpened }) => {
  let home = useRef(null);
  useEffect(() => {
    TweenMax.from(home, 2, {
      opacity: "0",
      y: "50px",
      ease: "power4.out",
    });
  }, []);

  return (
    <div ref={(element) => (home = element)} style={{ zIndex: "1" }}>
      <Hero />
      <Features />
    </div>
  );
};

export default Home;
