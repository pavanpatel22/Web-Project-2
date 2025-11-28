import { createRoute, type AnyRoute, Link } from "@tanstack/react-router";
import { createTree } from "../../router";
import article from "./article";

export default (parent: AnyRoute) => {
  const blogRoute = createRoute({
    path: '/blog',
    getParentRoute: () => parent,
    component: BlogPage,
  });

  return createTree(blogRoute, article);
}

function BlogPage() {
  const featuredArticles = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      excerpt: "Exploring emerging trends and technologies that are shaping the next generation of web experiences.",
      tag: "Technology",
      date: "March 15, 2024",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Building Scalable React Applications",
      excerpt: "Architectural patterns and best practices for creating maintainable and performant React applications.",
      tag: "Development",
      date: "March 10, 2024",
      readTime: "12 min read"
    },
    {
      id: 3,
      title: "Design Systems in Practice",
      excerpt: "How we built a comprehensive design system that improved our development velocity by 40%.",
      tag: "Design",
      date: "March 5, 2024",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="blog-container fade-in-up">
      <header className="blog-header">
        <h1 className="blog-title">Journal</h1>
        <p className="blog-subtitle">
          Thoughts on technology, design, and the intersection of both
        </p>
      </header>

      <div className="articles-grid">
        {featuredArticles.map((article) => (
          <Link 
            to="/blog/article" 
            key={article.id}
            className="article-card"
          >
            <div className="article-meta">
              <span className="article-tag">{article.tag}</span>
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
            <h2 className="article-title">{article.title}</h2>
            <p className="article-excerpt">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}