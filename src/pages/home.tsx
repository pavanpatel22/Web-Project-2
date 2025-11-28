import { createRoute, type AnyRoute } from "@tanstack/react-router";

export default (parent: AnyRoute) => createRoute({
  path: '/',
  getParentRoute: () => parent,
  component: HomePage,
});

function HomePage() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with React and Node.js, featuring real-time inventory and seamless payment integration.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    },
    {
      title: "Health & Wellness App",
      description: "Mobile application for tracking fitness goals and nutrition with AI-powered recommendations.",
      tags: ["React Native", "Firebase", "TensorFlow"],
      link: "#"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for analyzing business metrics with real-time data streaming and custom reporting.",
      tags: ["D3.js", "WebSocket", "Python"],
      link: "#"
    }
  ];

  return (
    <div className="fade-in-up">
      {/* Hero Section */}
      <section className="hero">
        <h1>Creating digital experiences that matter</h1>
        <p className="hero-subtitle">
          I'm Alex Chen, a creative developer passionate about building 
          innovative solutions that bridge technology and human needs.
        </p>
        <a href="/about" className="cta-button">
          View My Work
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
          </svg>
        </a>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
              </div>
              <a href={project.link} className="project-link">
                View Case Study
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.66667 12.6667L5.72667 11.7267L8.78 8.66667H2V7.33333H8.78L5.72667 4.27333L6.66667 3.33333L11.3333 8L6.66667 12.6667Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}