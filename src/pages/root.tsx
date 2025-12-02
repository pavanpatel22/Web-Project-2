import { Link, Outlet } from "@tanstack/react-router";
import { useEffect } from 'react';

export default function Root() {
  useEffect(() => {
    // Add smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.pathname === window.location.pathname) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as any);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as any);
      });
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span className="logo-text">PP</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link" activeProps={{ className: "nav-link active" }}>
              Home
            </Link>
            <Link to="/page1" className="nav-link" activeProps={{ className: "nav-link active" }}>
              Services
            </Link>
            <Link to="/page2" className="nav-link" activeProps={{ className: "nav-link active" }}>
              Contact
            </Link>
            <Link to="/blog" className="nav-link" activeProps={{ className: "nav-link active" }}>
              Journal
            </Link>
            <Link to="/about" className="nav-link" activeProps={{ className: "nav-link active" }}>
              About
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Pavan Patel. Crafted with purpose in Brooklyn.</p>
          <div className="social-links">
            <a href="#" className="social-link">GitHub</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
      </footer>
    </>
  );
}