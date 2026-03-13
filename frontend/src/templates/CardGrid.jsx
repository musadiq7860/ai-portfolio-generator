import React from 'react';

const CardGrid = ({ content, githubData, metadata }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--geist-background)',
      color: 'var(--geist-foreground)',
      padding: '120px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '100px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '12px' }}>{content.name}</h1>
          <p style={{ fontSize: '18px', color: 'var(--geist-secondary)' }}>{metadata.role} ARCHIVE</p>
        </header>

        <section style={{ marginBottom: '120px' }}>
          <div style={{ padding: '0 0 80px', borderBottom: '1px solid var(--geist-border)' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: 'var(--geist-secondary)' }}>Narrative</h2>
            <p style={{ fontSize: '24px', lineHeight: '1.4', color: 'var(--geist-foreground)', maxWidth: '800px' }}>{content.bio}</p>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '48px', color: 'var(--geist-secondary)' }}>Selected Artifacts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1px', background: 'var(--geist-border)', border: '1px solid var(--geist-border)' }}>
            {content.featured_projects?.map((project, i) => (
              <div key={i} style={{ 
                background: 'var(--geist-background)', 
                padding: '48px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>{project.name}</h3>
                <p style={{ fontSize: '15px', color: 'var(--geist-secondary)', lineHeight: '1.6', marginBottom: '32px', flexGrow: 1 }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.technologies?.map((t, idx) => (
                    <span key={idx} style={{ border: '1px solid var(--geist-border)', padding: '4px 8px', borderRadius: '2px', fontSize: '11px', color: 'var(--geist-secondary)' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer style={{ marginTop: '160px', borderTop: '1px solid var(--geist-border)', paddingTop: '60px', color: 'var(--geist-secondary)', fontSize: '12px' }}>
          Identity synchronized {new Date().getFullYear()} via AI Portfolio.
        </footer>
      </div>
    </div>
  );
};

export default CardGrid;
