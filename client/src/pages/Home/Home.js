import React from "react";
import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";

const Home = ({ wasOpened, setWasOpened }) => {
  return (
    <div>
      <Hero wasOpened={wasOpened} setWasOpened={setWasOpened} />
      <Features wasOpened={wasOpened} setWasOpened={setWasOpened} />
    </div>
  );
};

export default Home;
