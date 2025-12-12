// src/components/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "",
  description = "MapMend Solution builds modern websites and optimizes Google Maps listings to help local businesses grow.",
  url = null,
  image = null,
  publishedTime = null,
  modifiedTime = null,
  author = "MapMend Solution",
  schema = null, // allow custom schema injection
}) {
  const SITE_NAME = "MapMend Solution";
  const BASE_URL = import.meta.env.VITE_SITE_URL || "https://mapmendsolution.com";

  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = url || BASE_URL;
  const ogImage = image || `${BASE_URL}/og-image.png`;

  // Default structured data for SEO
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo-mapmend.png`,
    description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-7366890727",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <Helmet>
      {/* BASIC TAGS */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* KEYWORDS (optimized for your business niche) */}
      <meta
        name="keywords"
        content="
          website design india,
          local business website,
          google maps optimization,
          google business profile seo,
          udaipur website design,
          jaipur website design,
          digital presence optimization,
          fast website development,
          MapMend Solution
        "
      />

      {/* OPEN GRAPH */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* TWITTER CARDS */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ARTICLE METADATA */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      <meta name="author" content={author} />

      {/* STRUCTURED DATA (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
}
