import React from 'react';

const ProjectCard = ({ project, isFeatured }) => {
  return (
    <div className={`card-editorial ${isFeatured ? 'featured' : ''}`} style={{
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      {isFeatured && (
        <div style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          background: 'var(--geist-accent)',
          color: '#000',
          fontSize: '10px',
          fontWeight: '800',
          padding: '2px 8px',
          borderRadius: '2px',
          textTransform: 'uppercase'
        }}>
          Featured
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{project.name}</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {project.technologies?.slice(0, 3).map((tech, i) => (
            <span key={i} style={{ fontSize: '12px', color: 'var(--geist-secondary)', fontWeight: '500' }}>
              {tech}{i < project.technologies.slice(0, 3).length - 1 ? ' /' : ''}
            </span>
          ))}
        </div>
      </div>

      <p style={{
        fontSize: '14px',
        color: 'var(--geist-secondary)',
        lineHeight: '1.6',
        flexGrow: 1,
        marginBottom: '32px'
      }}>
        {project.description}
      </p>

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
          gap: '8px'
        }}
      >
        View Repository <span>→</span>
      </a>
    </div>
  );
};

export default ProjectCard;
