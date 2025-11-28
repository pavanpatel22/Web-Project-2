import { createRoute, type AnyRoute } from "@tanstack/react-router";

export default (parent: AnyRoute) => createRoute({
  path: '/page2',
  getParentRoute: () => parent,
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="contact-container fade-in-up">
      <header className="contact-header">
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">
          Ready to start your next project? Let's discuss how we can work together.
        </p>
      </header>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div>
              <h3>Email</h3>
              <p>alex@example.com</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📱</div>
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div>
              <h3>Location</h3>
              <p>Brooklyn, NY 11201</p>
            </div>
          </div>
        </div>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={5} placeholder="Tell me about your project..."></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}