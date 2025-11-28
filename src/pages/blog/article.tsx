import { createRoute, type AnyRoute } from "@tanstack/react-router"

export default (parent: AnyRoute) => createRoute({
  path: '/article',
  getParentRoute: () => parent,
  component: ArticlePage,
})

function ArticlePage() {
  return (
    <div className="blog-container fade-in-up">
      <article style={{ maxWidth: '700px', margin: '0 auto' }}>
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span className="article-tag">Technology</span>
            <span>March 15, 2024</span>
            <span>8 min read</span>
          </div>
          <h1 style={{ 
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '3rem',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: 'var(--text)'
          }}>
            The Future of Web Development in 2024
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
            Exploring emerging trends and technologies that are shaping the next generation of web experiences.
          </p>
        </header>

        <div style={{ 
          fontSize: '1.125rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            The landscape of web development continues to evolve at an unprecedented pace. 
            As we move through 2024, several key trends are emerging that promise to reshape 
            how we build and experience the web.
          </p>

          <h2 style={{ 
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.75rem',
            fontWeight: 600,
            margin: '2rem 0 1rem',
            color: 'var(--text)'
          }}>
            The Rise of AI-Assisted Development
          </h2>

          <p style={{ marginBottom: '1.5rem' }}>
            Artificial intelligence is no longer just a buzzword—it's becoming an integral 
            part of the development workflow. From code completion to automated testing, 
            AI tools are helping developers work more efficiently and creatively.
          </p>

          <h2 style={{ 
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.75rem',
            fontWeight: 600,
            margin: '2rem 0 1rem',
            color: 'var(--text)'
          }}>
            WebAssembly Matures
          </h2>

          <p style={{ marginBottom: '1.5rem' }}>
            WebAssembly continues to gain traction, enabling high-performance applications 
            that were previously impossible in the browser. We're seeing more complex 
            applications, from video editing software to CAD tools, running entirely in the web.
          </p>
        </div>
      </article>
    </div>
  );
}