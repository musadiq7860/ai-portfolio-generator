import React from 'react';

const Magazine = ({ content, githubData, metadata }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--geist-background)',
      color: 'var(--geist-foreground)',
      padding: '80px 24px'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', borderBottom: '1px solid var(--geist-border)', paddingBottom: '60px', marginBottom: '80px' }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '32px', color: 'var(--geist-secondary)' }}>FOLIO {new Date().getFullYear()}</div>
          <h1 style={{ fontSize: 'clamp(60px, 10vw, 120px)', fontWeight: '700', margin: '0', lineHeight: '0.8', letterSpacing: '-0.02em' }}>{content.name.toUpperCase()}</h1>
          <div style={{ fontSize: '18px', marginTop: '24px', color: 'var(--geist-secondary)' }}>{metadata.role} ARCHIVE</div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '100px' }}>
          <section>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: 'var(--geist-secondary)' }}>Narrative</div>
            <p style={{ fontSize: '28px', lineHeight: '1.3', marginBottom: '80px', fontWeight: '500' }}>
              <span style={{ fontSize: '80px', float: 'left', lineHeight: '0.7', marginRight: '16px', fontWeight: '700' }}>{content.bio.charAt(0)}</span>
              {content.bio.substring(1)}
            </p>

            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: 'var(--geist-secondary)' }}>Key Manifestations</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              {content.featured_projects?.map((project, i) => (
                <div key={i}>
                  <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.01em' }}>{project.name}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--geist-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>{project.description}</p>
                  <div style={{ fontSize: '11px', color: 'var(--geist-secondary)', textTransform: 'uppercase', opacity: 0.6 }}>{project.technologies?.join(' • ')}</div>
                </div>
              ))}
            </div>
          </section>

          <aside>
            <div style={{ position: 'sticky', top: '120px', padding: '1px', background: 'var(--geist-border)' }}>
              <div style={{ background: 'var(--geist-background)', padding: '40px' }}>
                <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px' }}>Artifact Pool</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {githubData?.repos?.slice(0, 10).map((repo, i) => (
                    <div key={i} style={{ borderBottom: '1px solid var(--geist-border)', paddingBottom: '16px' }}>
                      <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{repo.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--geist-secondary)', textTransform: 'uppercase' }}>{repo.language || 'System'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Magazine;
