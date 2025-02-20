// server-side part (static generation)
import { notFound } from "next/navigation"; // to handle 404 pages

// Sample News Data (used for static generation)
const sampleNews = [
  {
    id: 1,
    title: "Sustainable Construction Practices",
    content:
      "Learn about sustainable construction practices that are shaping the future of the industry. Sustainable construction aims to reduce the environmental impact of buildings over their entire lifespan.",
    image: "/images/news/sustainable-construction.jpg",
    publishedAt: "2025-02-15",
  },
  {
    id: 2,
    title: "New FM Technology Innovations",
    content:
      "Discover the latest innovations in FM technology that are revolutionizing facility management. These technologies help improve energy efficiency, reduce costs, and enhance the quality of services.",
    image: "/images/news/fm-technology.jpg",
    publishedAt: "2025-01-28",
  },
];

// Server-side function to get the parameters for static generation
export async function generateStaticParams() {
  return sampleNews.map((news) => ({
    id: news.id.toString(),
  }));
}

// The NewsDetailPage component that is rendered server-side
export default async function NewsDetailPage({ params }) {
  const { id } = params;
  const newsItem = sampleNews.find((news) => news.id === parseInt(id));

  if (!newsItem) {
    return notFound(); // If no news item is found, show 404 page
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">{newsItem.title}</h1>
      <img
        src={newsItem.image}
        alt={newsItem.title}
        className="w-full h-96 object-cover mb-6 rounded-lg"
      />
      <p className="text-gray-700 mb-4">{newsItem.publishedAt}</p>
      <p className="text-lg text-gray-800">{newsItem.content}</p>
    </div>
  );
}
