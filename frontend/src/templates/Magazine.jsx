import React from 'react';
import { motion } from 'framer-motion';

const Magazine = ({ content, githubData, metadata }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      padding: '80px 24px'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.header variants={sectionVariants} style={{ textAlign: 'center', borderBottom: '1px solid #222', paddingBottom: '60px', marginBottom: '80px' }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '32px', color: '#666' }}>FOLIO {new Date().getFullYear()}</div>
          <h1 style={{ fontSize: 'clamp(60px, 10vw, 120px)', fontWeight: '700', margin: '0', lineHeight: '0.8', letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)' }}>{(content.name || '').toUpperCase()}</h1>
          <div style={{ fontSize: '18px', marginTop: '24px', color: '#888' }}>{metadata.role} ARCHIVE</div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '32px' }}>
            {content.contact_details?.email && (
              <a href={`mailto:${content.contact_details.email}`} style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>Email</a>
            )}
            {content.contact_details?.linkedin && (
              <a href={content.contact_details.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>LinkedIn</a>
            )}
            {githubData?.github_url && (
              <a href={githubData.github_url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>GitHub</a>
            )}
          </div>

          {content.one_liner && (
            <div style={{ fontSize: '13px', marginTop: '32px', color: '#555', fontStyle: 'italic' }}>"{content.one_liner}"</div>
          )}
        </motion.header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '100px' }}>
          <section>
            <motion.div variants={sectionVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: '#666' }}>Narrative</motion.div>
            <motion.p variants={sectionVariants} style={{ fontSize: '28px', lineHeight: '1.3', marginBottom: '80px', fontWeight: '500', fontFamily: 'var(--font-heading)' }}>
              <span style={{ fontSize: '80px', float: 'left', lineHeight: '0.7', marginRight: '16px', fontWeight: '700' }}>{(content.bio || '').charAt(0)}</span>
              {(content.bio || '').substring(1)}
            </motion.p>

            {content.skills?.length > 0 && (
              <motion.div variants={sectionVariants} style={{ marginBottom: '80px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', color: '#666' }}>Proficiencies</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {content.skills.map((skill, i) => (
                    <span key={i} style={{ fontSize: '11px', color: '#888', border: '1px solid #333', padding: '4px 10px', borderRadius: '2px' }}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div variants={sectionVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: '#666' }}>Key Manifestations</motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
              {content.featured_projects?.map((project, i) => (
                <motion.div key={i} variants={sectionVariants} whileHover={{ x: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.01em', fontFamily: 'var(--font-heading)' }}>{project.name}</h3>
                    <span style={{ fontSize: '10px', color: '#00ff88', fontWeight: '700' }}>FEATURED</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#888', marginBottom: '24px', lineHeight: '1.7' }}>{project.description}</p>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase' }}>{project.technologies?.join(' • ')}</div>
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#fff', textDecoration: 'none', marginLeft: 'auto' }}>View →</a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {content.other_projects?.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} style={{ marginTop: '80px' }}>
                <motion.div variants={sectionVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: '#666' }}>Extended Works</motion.div>
                {content.other_projects.map((project, i) => (
                  <motion.div key={i} variants={sectionVariants} style={{ borderBottom: '1px solid #222', paddingBottom: '20px', marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>{project.name}</h4>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>{project.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {content.experience?.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} style={{ marginTop: '80px' }}>
                <motion.div variants={sectionVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', color: '#666' }}>Career Timeline</motion.div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  {content.experience.map((exp, i) => (
                    <motion.div key={i} variants={sectionVariants}>
                      <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>{exp.title}</h4>
                      <div style={{ fontSize: '12px', color: '#555', marginBottom: '12px' }}>{exp.company} · {exp.duration}</div>
                      <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6' }}>{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {content.education?.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} style={{ marginTop: '80px' }}>
                <motion.div variants={sectionVariants} style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', color: '#666' }}>Academic Foundations</motion.div>
                {content.education.map((edu, i) => (
                  <motion.div key={i} variants={sectionVariants} style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{edu.degree}</h4>
                    <div style={{ fontSize: '12px', color: '#555' }}>{edu.institution} · {edu.year}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>

          <motion.aside variants={sectionVariants}>
            <div style={{ position: 'sticky', top: '120px', padding: '1px', background: '#222' }}>
              <div style={{ background: '#000', padding: '40px' }}>
                <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px', fontFamily: 'var(--font-heading)' }}>Artifact Pool</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {githubData?.repos?.slice(0, 12).map((repo, i) => (
                    <motion.div key={i} whileHover={{ x: 5 }} style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '16px' }}>
                      <div style={{ fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{repo.name}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase' }}>{repo.language || 'System'}</span>
                        {repo.stars > 0 && <span style={{ fontSize: '11px', color: '#555' }}>★ {repo.stars}</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.div>
  );
};

export default Magazine;
