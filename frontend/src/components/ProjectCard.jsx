import React from 'react';

const ProjectCard = ({ project, isFeatured }) => {
  return (
    <div className={`card-editorial ${isFeatured ? 'featured' : ''}`} style={{
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}
    onMouseOver={(e) => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseOut={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {isFeatured && (
        <div style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          background: 'var(--geist-accent)',
          color: '#000',
          fontSize: '10px',
          fontWeight: '800',
          padding: '3px 10px',
          borderRadius: '2px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Featured
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>{project.name}</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {project.technologies?.slice(0, 4).map((tech, i) => (
            <span key={i} style={{
              fontSize: '11px',
              color: 'var(--geist-secondary)',
              fontWeight: '500',
              border: '1px solid var(--geist-border)',
              padding: '2px 8px',
              borderRadius: '2px'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <p style={{
        fontSize: '14px',
        color: 'var(--geist-secondary)',
        lineHeight: '1.7',
        flexGrow: 1,
        marginBottom: '24px'
      }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {project.github_url ? (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--geist-foreground)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'opacity 0.2s ease'
            }}
          >
            View Repository <span style={{ fontSize: '16px' }}>→</span>
          </a>
        ) : (
          <span style={{ fontSize: '12px', color: 'var(--geist-secondary)' }}>Private</span>
        )}
        {project.stars > 0 && (
          <span style={{ fontSize: '12px', color: 'var(--geist-secondary)' }}>★ {project.stars}</span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
