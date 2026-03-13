import React from 'react';

const Terminal = ({ content, githubData, metadata }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--geist-background)',
      color: 'var(--geist-accent)',
      padding: '40px',
      lineHeight: '1.6'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <header style={{ borderBottom: '1px solid var(--geist-accent)', paddingBottom: '20px', marginBottom: '40px', opacity: 0.8 }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{">"} ID: {content.name.toUpperCase()} // ROLE: {metadata.role.toUpperCase()}</div>
        </header>

        <section style={{ marginBottom: '64px' }}>
          <div style={{ color: 'var(--geist-foreground)', marginBottom: '16px', fontSize: '12px', fontWeight: '600' }}>[ cat about_me.md ]</div>
          <p style={{ color: 'var(--geist-accent)', fontSize: '18px', maxWidth: '700px' }}>{content.bio}</p>
        </section>

        <section style={{ marginBottom: '64px' }}>
          <div style={{ color: 'var(--geist-foreground)', marginBottom: '24px', fontSize: '12px', fontWeight: '600' }}>[ ls ./core_competencies ]</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {content.featured_projects?.map((project, i) => (
              <div key={i} style={{ border: '1px solid var(--geist-accent)', padding: '24px', borderRadius: '4px', background: 'rgba(0, 255, 136, 0.02)' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>{project.name}</div>
                <p style={{ fontSize: '13px', marginBottom: '16px', opacity: 0.8 }}>{project.description}</p>
                <div style={{ fontSize: '10px', opacity: 0.6 }}>{project.technologies?.join(' // ')}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div style={{ color: 'var(--geist-foreground)', marginBottom: '16px', fontSize: '12px', fontWeight: '600' }}>[ ./fetch_raw_artifacts.sh ]</div>
          <div style={{ color: 'var(--geist-accent)', opacity: 0.5, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {githubData?.repos?.slice(0, 8).map((repo, i) => (
              <div key={i}>→ {repo.name} {repo.language ? `[${repo.language}]` : ''}</div>
            ))}
          </div>
        </section>

        <footer style={{ marginTop: '120px', fontSize: '10px', opacity: 0.4, textAlign: 'center', letterSpacing: '0.2em' }}>
          TERMINAL PROTOCOL ACTIVE // END OF ARCHIVE
        </footer>
      </div>
    </div>
  );
};

export default Terminal;
