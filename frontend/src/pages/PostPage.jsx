// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SEO from "../components/SEO";

const MOCK_POSTS = {
  "why-local-business-needs-website-2025": {
    title: "Why Every Local Business Needs a Website in 2025",
    date: "2025-06-01",
    excerpt: "Modern customers check online first — this is why your business needs a website today.",
    content: `### Quick Wins\n\nA website builds trust, lists your contact details, and appears on Google.`,
  },
  // add other posts
};

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Replace with API call: axios.get(`${VITE_API_URL}/posts/${slug}`)
    setPost(MOCK_POSTS[slug]);
  }, [slug]);

  if (!post) return <div className="py-20 text-center">Loading...</div>;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": { "@type": "Person", "name": "MapMend Solution" },
    "datePublished": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${import.meta.env.VITE_SITE_URL || ""}/blog/${slug}`
    }
  };

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`${import.meta.env.VITE_SITE_URL || ""}/blog/${slug}`}
        schema={schema}
        publishedTime={post.date}
      />
      <article className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl font-extrabold text-brandBlue mb-3">{post.title}</h1>
          <div className="text-gray-500 text-sm mb-6">{post.date}</div>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </>
  );
}
