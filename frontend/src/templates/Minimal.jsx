import React from 'react';

const Minimal = ({ content, githubData, metadata }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--geist-background)',
      color: 'var(--geist-foreground)',
      padding: '120px 40px',
      lineHeight: '1.6'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ marginBottom: '120px' }}>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: '700', marginBottom: '8px' }}>{content.name}</h1>
          <p style={{ fontSize: '18px', color: 'var(--geist-secondary)' }}>{metadata.role} • Digital Architect</p>
        </header>

        <section style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--geist-secondary)', marginBottom: '32px' }}>Profile</h2>
          <p style={{ fontSize: '20px', color: 'var(--geist-foreground)', fontWeight: '400' }}>{content.bio}</p>
        </section>

        <section style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--geist-secondary)', marginBottom: '32px' }}>Selected Works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {content.featured_projects?.map((project, i) => (
              <div key={i}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>{project.name}</h3>
                <p style={{ color: 'var(--geist-secondary)', fontSize: '15px', marginBottom: '24px', maxWidth: '600px' }}>{project.description}</p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {project.technologies?.map((tech, j) => (
                    <span key={j} style={{ fontSize: '11px', color: 'var(--geist-secondary)', border: '1px solid var(--geist-border)', padding: '4px 8px', borderRadius: '2px' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer style={{ paddingTop: '60px', borderTop: '1px solid var(--geist-border)', fontSize: '12px', color: 'var(--geist-secondary)' }}>
          &copy; {new Date().getFullYear()} {content.name}. Established via AI Portfolio.
        </footer>
      </div>
    </div>
  );
};

export default Minimal;
