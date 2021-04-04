import React, { useEffect, useRef } from "react";
import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";
import { pageFadeIn, toTop } from "../../utils/animation";
const Home = () => {
  let home = useRef(null);
  useEffect(() => {
    toTop();
    pageFadeIn(home);
  }, []);

  return (
    <div ref={(element) => (home = element)}>
      <Hero />
      <Features />
    </div>
  );
};

export default Home;
