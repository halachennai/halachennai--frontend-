import React from "react";
import Hero from "../Components/Hero/Hero";
import About from "../Components/About/About";
import NewCollections from "../Components/NewCollections/NewCollections";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <NewCollections />
    </div>
  );
};

export default Home;
