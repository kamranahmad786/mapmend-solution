import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Marketing Sections
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

// City Pages
import CityLanding from "./components/CityLanding";

// Auth
import Register from "./pages/Register";
import Login from "./pages/Login";

// Dashboard Layout + Child Pages
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import AIAnalysis from "./pages/AIAnalysis";
import MyWebsites from "./pages/MyWebsites";
import Invoices from "./pages/Invoices";
import Account from "./pages/Account";
import UserReviews from "./pages/UserReviews";

// Policy Pages
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CancellationPolicy from "./pages/CancellationPolicy";
import AboutPage from "./pages/AboutPage";

// Interactive
import Chatbot from "./components/Chatbot";
import { ToastProvider } from "./components/Toast";

// Admin System
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminSites from "./pages/admin/AdminSites";
import AdminTestimonials from "./pages/admin/AdminTestimonials";

// Scroll to top on route change
function ScrollToTop() {
  useEffect(() => window.scrollTo(0, 0));
  return null;
}

export default function App() {
  const location = useLocation();

  // Detect dashboard and admin area
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAdmin = location.pathname.startsWith("/admin");

  const hideNavbarFooter = isDashboard || isAdmin;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col relative w-full overflow-hidden">

          {/* Navbar hidden on Dashboard + Admin */}
          {!hideNavbarFooter && <Navbar />}

          <ScrollToTop />

          <main className="flex-1">
            <Routes>

              {/* ---------------- HOME PAGE ---------------- */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <About />
                    <WhyChooseUs />
                    <Services />
                    <Process />
                    <Pricing />
                    <Testimonials />
                    <FAQ />
                    <ContactForm />
                  </>
                }
              />

              {/* ---------------- AUTH ---------------- */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* ---------------- DASHBOARD (Protected Layout) ---------------- */}
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="ai" element={<AIAnalysis />} />
                <Route path="websites" element={<MyWebsites />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="reviews" element={<UserReviews />} />
                <Route path="account" element={<Account />} />
              </Route>

              {/* ---------------- ADMIN PANEL ---------------- */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminPanel />}>
                <Route index element={<AdminOverview />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="sites" element={<AdminSites />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
              </Route>

              {/* ---------------- BLOG ---------------- */}
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<PostPage />} />

              {/* ---------------- CITY LANDING PAGES ---------------- */}
              <Route path="/udaipur" element={<CityLanding city="Udaipur" />} />
              <Route path="/jaipur" element={<CityLanding city="Jaipur" />} />
              <Route path="/kota" element={<CityLanding city="Kota" />} />
              <Route path="/delhi" element={<CityLanding city="Delhi" />} />
              <Route path="/mumbai" element={<CityLanding city="Mumbai" />} />

              {/* ---------------- POLICIES ---------------- */}
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />

            </Routes>
          </main>

          {/* Global Floating Chatbot & Footer */}
          {!hideNavbarFooter && (
            <>
              <Chatbot />
              <Footer />
            </>
          )}
      </div>
    </ToastProvider>
  );
}
