import React from "react";
import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <Hero />
      </div>
      <Features />
    </div>
  );
};

export default Home;
