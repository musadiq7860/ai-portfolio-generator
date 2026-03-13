import React from 'react';

const Bold = ({ content, githubData, metadata }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--geist-background)',
      color: 'var(--geist-foreground)',
      padding: '0',
      overflowX: 'hidden'
    }}>
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8vw',
        background: 'var(--geist-foreground)',
        color: 'var(--geist-background)'
      }}>
        <h1 style={{ fontSize: 'clamp(80px, 12vw, 200px)', lineHeight: '0.8', margin: '0', fontWeight: '900', textTransform: 'uppercase' }}>
          {content.name.split(' ')[0]} <br /> {content.name.split(' ')[1] || ''}
        </h1>
        <p style={{ fontSize: '24px', fontWeight: '700', marginTop: '40px', letterSpacing: '0.1em' }}>
          {metadata.role.toUpperCase()}
        </p>
      </section>

      <section style={{ padding: '160px 8vw', background: 'var(--geist-background)' }}>
        <div style={{ maxWidth: '1000px' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '40px', color: 'var(--geist-secondary)' }}>The Mission</h2>
          <p style={{ fontSize: '36px', lineHeight: '1.2', fontWeight: '600', color: 'var(--geist-foreground)' }}>{content.bio}</p>
        </div>
      </section>

      <section style={{ padding: '160px 8vw', background: 'var(--geist-background)' }}>
        <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '80px', color: 'var(--geist-secondary)' }}>Weaponry</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px' }}>
          {content.featured_projects?.map((project, i) => (
            <div key={i} style={{ borderTop: '2px solid var(--geist-foreground)', paddingTop: '40px' }}>
              <div style={{ fontSize: '40px', fontWeight: '900', marginBottom: '24px', textTransform: 'uppercase' }}>{project.name}</div>
              <p style={{ fontSize: '16px', color: 'var(--geist-secondary)', marginBottom: '32px', lineHeight: '1.5' }}>{project.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.technologies?.map((t, idx) => (
                  <span key={idx} style={{ background: 'var(--geist-foreground)', color: 'var(--geist-background)', padding: '2px 8px', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: '100px 8vw', borderTop: '1px solid var(--geist-border)', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5em', color: 'var(--geist-secondary)' }}>Portfolio Engineered for the Elite</div>
      </footer>
    </div>
  );
};

export default Bold;
