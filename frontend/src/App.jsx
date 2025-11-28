import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Main Website Sections
import Hero from "./components/Hero";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Services from "./components/Services";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";

// Blog Pages
import BlogList from "./pages/BlogList";
import PostPage from "./pages/PostPage";

// City Landing Pages
import CityLanding from "./components/CityLanding";

// Small utility to scroll to top on page change
function ScrollToTop() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  });
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen text-gray-800 bg-white">
      <Navbar />

      <ScrollToTop />

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
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
          }
        />

        {/* BLOG PAGES */}
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<PostPage />} />

        {/* CITY LANDING PAGES */}
        <Route path="/udaipur" element={<CityLanding city="Udaipur" />} />
        <Route path="/jaipur" element={<CityLanding city="Jaipur" />} />
        <Route path="/kota" element={<CityLanding city="Kota" />} />
        <Route path="/delhi" element={<CityLanding city="Delhi" />} />
        <Route path="/mumbai" element={<CityLanding city="Mumbai" />} />
      </Routes>

      <Footer />
    </div>
  );
}
