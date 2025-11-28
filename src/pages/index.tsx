import { createRootRoute } from "@tanstack/react-router";
import page1 from "./page1";
import page2 from "./page2";
import about from "./about";
import blog from "./blog";
import home from "./home";
import { createTree } from "../router";
import Root from "./root";


export const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: ProjectNotFoundPage,
});

function ProjectNotFoundPage() {
  const projectFeatures = [
    {
      icon: "⚡",
      title: "Modern React Stack",
      description: "Built with Vite, TypeScript, and TanStack Router",
      path: "/about"
    },
    {
      icon: "🎨",
      title: "Advanced UI/UX",
      description: "Responsive design with modern CSS and animations",
      path: "/"
    },
    {
      icon: "📝",
      title: "Blog System",
      description: "Content management with nested routing",
      path: "/blog"
    },
    {
      icon: "🚀",
      title: "Performance Optimized",
      description: "Fast loading with code splitting and lazy loading",
      path: "/about"
    }
  ];

  return (
    <div className="project-not-found-container">
      <div className="project-bg-elements">
        <div className="code-orb"></div>
        <div className="react-logo"></div>
        <div className="typescript-orb"></div>
      </div>

      <div className="project-not-found-content">
        <div className="project-header">
          <div className="tech-stack-indicator">
            <span className="tech-tag">React</span>
            <span className="tech-tag">TypeScript</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">TanStack</span>
          </div>
          
          <h1 className="project-title">
            <span className="title-accent">Content</span> Navigation
          </h1>
          <p className="project-subtitle">
            This route isn't available, but here's what you can explore in this project
          </p>
        </div>

        <section className="features-section">
          <h2 className="section-title">Project Features</h2>
          <div className="features-grid">
            {projectFeatures.map((feature, index) => (
              <a 
                key={index}
                href={feature.path}
                className="feature-card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-arrow">→</div>
              </a>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-card">
            <h2>Ready to Explore?</h2>
            <p>Start with the home page to see all project features in action</p>
            <div className="cta-buttons">
              <a href="/" className="cta-button primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Go to Homepage
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export const routeTree = createTree(
  rootRoute,
  home,
  page1,
  page2,
  blog,
  about
);