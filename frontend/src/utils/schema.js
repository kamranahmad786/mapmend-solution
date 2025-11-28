// src/utils/schema.js
export function localBusinessSchema({ name, url, phone, addressLocality }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url,
    telephone: phone,
    address: { "@type": "PostalAddress", addressLocality, addressCountry: "IN" }
  };
}
