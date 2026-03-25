import React from 'react';
import { motion } from 'framer-motion';

const CardGrid = ({ content, githubData, metadata }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      padding: '120px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.header variants={cardVariants} style={{ marginBottom: '100px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '12px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}>{content.name}</h1>
          <p style={{ fontSize: '18px', color: '#888', marginBottom: '24px' }}>{metadata.role}</p>
          
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
            {content.contact_details?.email && (
              <a href={`mailto:${content.contact_details.email}`} style={{ color: '#ccc', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', border: '1px solid #333' }}>Email</a>
            )}
            {content.contact_details?.linkedin && (
              <a href={content.contact_details.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', border: '1px solid #333' }}>LinkedIn</a>
            )}
            {githubData?.github_url && (
              <a href={githubData.github_url} target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', border: '1px solid #333' }}>GitHub</a>
            )}
          </div>

          {content.one_liner && (
            <p style={{ fontSize: '14px', color: '#555', marginTop: '32px' }}>"{content.one_liner}"</p>
          )}
        </motion.header>

        <motion.section variants={cardVariants} style={{ marginBottom: '120px' }}>
          <div style={{ padding: '0 0 80px', borderBottom: '1px solid #222' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: '#666' }}>Narrative</h2>
            <p style={{ fontSize: '24px', lineHeight: '1.4', maxWidth: '800px', fontFamily: 'var(--font-heading)' }}>{content.bio}</p>
          </div>
        </motion.section>

        {content.skills?.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ marginBottom: '120px' }}>
            <motion.h2 variants={cardVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: '#666' }}>Core Stack</motion.h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {content.skills.map((skill, i) => (
                <motion.span key={i} variants={cardVariants} whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }} style={{
                  border: '1px solid #333',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: '#ccc',
                  background: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer'
                }}>{skill}</motion.span>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ marginBottom: '120px' }}>
          <motion.h2 variants={cardVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '48px', color: '#666' }}>Selected Artifacts</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1px', background: '#222', border: '1px solid #222' }}>
            {content.featured_projects?.map((project, i) => (
              <motion.div key={i} variants={cardVariants} whileHover={{ y: -5 }} style={{
                background: '#000',
                padding: '48px',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>{project.name}</h3>
                  <span style={{ fontSize: '10px', color: '#00ff88', fontWeight: '700', letterSpacing: '0.05em' }}>FEATURED</span>
                </div>
                <p style={{ fontSize: '15px', color: '#888', lineHeight: '1.6', marginBottom: '32px', flexGrow: 1 }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  {project.technologies?.map((t, idx) => (
                    <span key={idx} style={{ border: '1px solid #333', padding: '4px 8px', borderRadius: '2px', fontSize: '11px', color: '#888' }}>{t}</span>
                  ))}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#fff', textDecoration: 'none', marginLeft: 'auto' }}>Source →</a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {content.other_projects?.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ marginBottom: '120px' }}>
            <motion.h2 variants={cardVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: '#666' }}>Other Projects</motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1px', background: '#1a1a1a', border: '1px solid #1a1a1a' }}>
              {content.other_projects.map((project, i) => (
                <motion.div key={i} variants={cardVariants} whileHover={{ background: '#0a0a0a' }} style={{ background: '#000', padding: '32px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{project.name}</h4>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', marginBottom: '16px' }}>{project.description}</p>
                  <div style={{ fontSize: '10px', color: '#444' }}>{project.technologies?.join(' · ')}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {content.experience?.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ marginBottom: '120px' }}>
            <motion.h2 variants={cardVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '48px', color: '#666' }}>Experience</motion.h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#222', border: '1px solid #222' }}>
              {content.experience.map((exp, i) => (
                <motion.div key={i} variants={cardVariants} style={{ background: '#000', padding: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '700' }}>{exp.title}</h4>
                    <span style={{ fontSize: '12px', color: '#555' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#555', marginBottom: '12px' }}>{exp.company}</div>
                  <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6' }}>{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {content.education?.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ marginBottom: '120px' }}>
            <motion.h2 variants={cardVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: '#666' }}>Education</motion.h2>
            {content.education.map((edu, i) => (
              <motion.div key={i} variants={cardVariants} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #1a1a1a' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{edu.degree}</h4>
                <div style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>{edu.institution} · {edu.year}</div>
              </motion.div>
            ))}
          </motion.section>
        )}

        {githubData?.repos?.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ marginBottom: '120px' }}>
            <motion.h2 variants={cardVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: '#666' }}>All Repositories</motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1px', background: '#1a1a1a' }}>
              {githubData.repos.slice(0, 15).map((repo, i) => (
                <motion.div key={i} variants={cardVariants} whileHover={{ scale: 1.02 }} style={{ background: '#000', padding: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>{repo.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#555' }}>
                    <span>{repo.language || 'Other'}</span>
                    {repo.stars > 0 && <span>★ {repo.stars}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <footer style={{ marginTop: '60px', borderTop: '1px solid #222', paddingTop: '60px', color: '#444', fontSize: '12px' }}>
          Identity synchronized {new Date().getFullYear()} via AI Portfolio.
        </footer>
      </div>
    </motion.div>
  );
};

export default CardGrid;
