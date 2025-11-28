import { createRoute, type AnyRoute } from "@tanstack/react-router";

export default (parent: AnyRoute) =>
  createRoute({
    path: "/about",
    getParentRoute: () => parent,
    component: AboutPage,
  });

function AboutPage() {
  return (
    <div className="about-container fade-in-up">
      <header className="about-header">
        <h1 className="about-title">About Me</h1>
      </header>

      <div className="about-content">
        <div className="about-text">
          <p>
            Hello! I'm Alex Chen, a creative developer with over 8 years of experience 
            building digital products that users love. My journey started in computer science, 
            but I quickly discovered my passion lies at the intersection of technology and design.
          </p>
          
          <p>
            I specialize in creating seamless user experiences through thoughtful design 
            and robust engineering. Whether it's a responsive web application or a 
            complex backend system, I believe in writing clean, maintainable code that 
            stands the test of time.
          </p>

          <p>
            When I'm not coding, you can find me exploring new hiking trails, experimenting 
            with photography, or contributing to open-source projects. I'm always excited 
            about new challenges and opportunities to learn.
          </p>
        </div>

        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul className="skill-list">
              <li>React & TypeScript</li>
              <li>Vue.js & Nuxt</li>
              <li>Next.js & Remix</li>
              <li>CSS-in-JS & Tailwind</li>
            </ul>
          </div>

          <div className="skill-category">
            <h3>Backend</h3>
            <ul className="skill-list">
              <li>Node.js & Express</li>
              <li>Python & Django</li>
              <li>PostgreSQL & MongoDB</li>
              <li>Redis & Elasticsearch</li>
            </ul>
          </div>

          <div className="skill-category">
            <h3>Tools & Other</h3>
            <ul className="skill-list">
              <li>Docker & Kubernetes</li>
              <li>AWS & GCP</li>
              <li>CI/CD & GitHub Actions</li>
              <li>Figma & Adobe Creative Suite</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}