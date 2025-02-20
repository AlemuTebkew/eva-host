"use client";

import Link from "next/link";
import { useState } from "react";

// Sample News Data
const sampleNews = [
  {
    id: 1,
    title: "Sustainable Construction Practices",
    content:
      "Learn about sustainable construction practices that are shaping the future of the industry.",
    image: "/images/news/sustainable-construction.jpg",
    publishedAt: "2025-02-15",
  },
  {
    id: 2,
    title: "New FM Technology Innovations",
    content:
      "Discover the latest innovations in FM technology that are revolutionizing facility management.",
    image: "/images/news/fm-technology.jpg",
    publishedAt: "2025-01-28",
  },
  {
    id: 2,
    title: "New FM Technology Innovations",
    content:
      "Discover the latest innovations in FM technology that are revolutionizing facility management.",
    image: "/images/news/fm-technology.jpg",
    publishedAt: "2025-01-28",
  },
  {
    id: 2,
    title: "New FM Technology Innovations",
    content:
      "Discover the latest innovations in FM technology that are revolutionizing facility management.",
    image: "/images/news/fm-technology.jpg",
    publishedAt: "2025-01-28",
  },
  {
    id: 2,
    title: "New FM Technology Innovations",
    content:
      "Discover the latest innovations in FM technology that are revolutionizing facility management.",
    image: "/images/news/fm-technology.jpg",
    publishedAt: "2025-01-28",
  },
  {
    id: 2,
    title: "New FM Technology Innovations",
    content:
      "Discover the latest innovations in FM technology that are revolutionizing facility management.",
    image: "/images/news/fm-technology.jpg",
    publishedAt: "2025-01-28",
  },
  {
    id: 2,
    title: "New FM Technology Innovations",
    content:
      "Discover the latest innovations in FM technology that are revolutionizing facility management.",
    image: "/images/news/fm-technology.jpg",
    publishedAt: "2025-01-28",
  },
  {
    id: 2,
    title: "New FM Technology Innovations",
    content:
      "Discover the latest innovations in FM technology that are revolutionizing facility management.",
    image: "/images/news/fm-technology.jpg",
    publishedAt: "2025-01-28",
  },
];

const NewsPage = () => {
  const [news, setNews] = useState(sampleNews);

  return (
    <div className="bg-white py-28">
      <div className="w-full lg:container max-w-screen-lg"> 
      <h1 className="text-4xl font-bold mt-6">Latest News</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} className="block">
            <div className="bg-white p-4 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h2 className="mt-4 text-xl font-bold">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.publishedAt}</p>
              <p className="mt-2 text-gray-700">{item.content.slice(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
};

export default NewsPage;
