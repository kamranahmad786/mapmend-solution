import React from "react";
import About from "../components/About";
import SEO from "../components/SEO";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us - MapMend Solution"
        description="Learn how MapMend Solution helps local businesses grow with website design, Google Maps optimization, and business visibility services."
        url="/about-us"
      />

      <div className="pt-24">
        <About />
      </div>
    </>
  );
}
