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
            Hi! I'm Pavan Patel, a passionate developer who loves turning ideas into digital experiences. 
            Over the past few years, I've worked on a variety of projects ranging from sleek web applications 
            to scalable backend systems, always aiming to create solutions that are both functional and elegant.
          </p>
          
          <p>
            My focus is on crafting seamless user experiences, writing maintainable code, and embracing modern 
            technologies. I enjoy solving complex problems and finding innovative ways to improve both performance 
            and usability in every project I undertake.
          </p>

          <p>
            Outside of coding, I’m an avid explorer—whether it’s hiking through scenic trails, 
            capturing moments through photography, or experimenting with new technologies. 
            I thrive in environments that challenge me to learn, adapt, and grow.
          </p>
        </div>

        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul className="skill-list">
              <li>React & TypeScript</li>
              <li>Vue.js & Nuxt</li>
              <li>Next.js & Remix</li>
              <li>Tailwind CSS & Styled Components</li>
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
