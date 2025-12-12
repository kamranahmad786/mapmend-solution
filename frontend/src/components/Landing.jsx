// src/pages/Landing.jsx
import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import Services from "../components/Services";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import ContactForm from "../components/ContactForm";

export default function Landing() {
  return (
    <main>
      <Hero />
      <About />
      <WhyChooseUs />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <FAQ />
      <ContactForm />
    </main>
  );
}
