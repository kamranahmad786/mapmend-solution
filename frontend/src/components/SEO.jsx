// src/components/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author = "MapMend Solution",
  schema = null, // pass JSON-LD object
}) {
  const siteTitle = "MapMend Solution";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaImage = image || `${import.meta.env.VITE_SITE_URL || ""}/og-image.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="website design, Google Maps optimization, local SEO, MapMend Solution" />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />
      {publishedTime && <meta name="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta name="article:modified_time" content={modifiedTime} />}
      <meta name="author" content={author} />

      {/* JSON-LD Schema injection */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
