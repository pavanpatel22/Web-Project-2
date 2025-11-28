import { createRoute, type AnyRoute } from "@tanstack/react-router"

export default (parent: AnyRoute) => createRoute({
  path: '/page1',
  getParentRoute: () => parent,
  component: ServicesPage,
})

function ServicesPage() {
  const services = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Custom web applications built with modern frameworks and best practices.",
      features: ["React/Next.js", "TypeScript", "Responsive Design", "Performance Optimization"]
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Cross-platform mobile applications for iOS and Android.",
      features: ["React Native", "Flutter", "Native Performance", "App Store Deployment"]
    },
    {
      icon: "⚙️",
      title: "Backend Development",
      description: "Scalable server architecture and API development.",
      features: ["Node.js", "Python", "Database Design", "Cloud Deployment"]
    }
  ];

  return (
    <div className="services-container fade-in-up">
      <header className="services-header">
        <h1 className="services-title">Services & Solutions</h1>
        <p className="services-subtitle">
          Comprehensive digital solutions tailored to your business needs
        </p>
      </header>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="service-feature">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <a href="/contact" className="service-cta">
              Learn More
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.66667 12.6667L5.72667 11.7267L8.78 8.66667H2V7.33333H8.78L5.72667 4.27333L6.66667 3.33333L11.3333 8L6.66667 12.6667Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}