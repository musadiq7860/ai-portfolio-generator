import React from 'react';
import { motion } from 'framer-motion';

const Bold = ({ content, githubData, metadata }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const blockVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      padding: '0',
      overflowX: 'hidden'
    }}>
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 8vw',
        background: '#fff',
        color: '#000'
      }}>
        <motion.h1 variants={blockVariants} style={{ fontSize: 'clamp(60px, 12vw, 200px)', lineHeight: '0.8', margin: '0', fontWeight: '900', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}>
          {(content.name || '').split(' ')[0]} <br /> {(content.name || '').split(' ').slice(1).join(' ')}
        </motion.h1>
        <motion.p variants={blockVariants} style={{ fontSize: '24px', fontWeight: '700', marginTop: '40px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {(metadata.role || '').toUpperCase()}
        </motion.p>
        
        <motion.div variants={blockVariants} style={{ display: 'flex', gap: '24px', marginTop: '32px', fontSize: '12px', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {content.contact_details?.email && (
            <a href={`mailto:${content.contact_details.email}`} style={{ color: '#000', textDecoration: 'none', borderBottom: '2px solid #000', paddingBottom: '4px' }}>EMAIL</a>
          )}
          {content.contact_details?.linkedin && (
            <a href={content.contact_details.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none', borderBottom: '2px solid #000', paddingBottom: '4px' }}>LINKEDIN</a>
          )}
        </motion.div>
        {content.one_liner && (
          <motion.p variants={blockVariants} style={{ fontSize: '14px', marginTop: '16px', color: '#666', maxWidth: '500px' }}>{content.one_liner}</motion.p>
        )}
      </section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ padding: '160px 8vw', background: '#000' }}>
        <div style={{ maxWidth: '1000px' }}>
          <motion.h2 variants={blockVariants} style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '40px', color: '#666' }}>The Mission</motion.h2>
          <motion.p variants={blockVariants} style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: '1.2', fontWeight: '600' }}>{content.bio}</motion.p>
        </div>
      </motion.section>

      {content.skills?.length > 0 && (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ padding: '120px 8vw', background: '#0a0a0a' }}>
          <motion.h2 variants={blockVariants} style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '48px', color: '#666' }}>Arsenal</motion.h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {content.skills.map((skill, i) => (
              <motion.span key={i} variants={blockVariants} whileHover={{ scale: 1.1 }} style={{
                background: '#fff',
                color: '#000',
                padding: '6px 16px',
                fontSize: '12px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>{skill}</motion.span>
            ))}
          </div>
        </motion.section>
      )}

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ padding: '160px 8vw', background: '#000' }}>
        <motion.h2 variants={blockVariants} style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '80px', color: '#666' }}>Weaponry</motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px' }}>
          {content.featured_projects?.map((project, i) => (
            <motion.div key={i} variants={blockVariants} style={{ borderTop: '2px solid #fff', paddingTop: '40px' }}>
              <div style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '900', marginBottom: '24px', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>{project.name}</div>
              <p style={{ fontSize: '16px', color: '#888', marginBottom: '32px', lineHeight: '1.5' }}>{project.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                {project.technologies?.map((t, idx) => (
                  <span key={idx} style={{ background: '#fff', color: '#000', padding: '2px 8px', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase' }}>{t}</span>
                ))}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#fff', textDecoration: 'none', marginLeft: 'auto', fontWeight: '700' }}>SOURCE →</a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {content.other_projects?.length > 0 && (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ padding: '120px 8vw', background: '#0a0a0a' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '48px', color: '#666' }}>Additional Works</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {content.other_projects.map((project, i) => (
              <motion.div key={i} variants={blockVariants} style={{ borderTop: '1px solid #222', padding: '32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>{project.name}</div>
                  <p style={{ fontSize: '13px', color: '#666' }}>{project.description}</p>
                </div>
                <div style={{ fontSize: '10px', color: '#444', textTransform: 'uppercase' }}>{project.technologies?.join(' / ')}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {content.experience?.length > 0 && (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ padding: '160px 8vw', background: '#000' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '64px', color: '#666' }}>Campaign History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {content.experience.map((exp, i) => (
              <motion.div key={i} variants={blockVariants} style={{ borderLeft: '3px solid #fff', paddingLeft: '32px' }}>
                <div style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>{exp.title}</div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px', fontWeight: '700', letterSpacing: '0.05em' }}>{exp.company} // {exp.duration}</div>
                <p style={{ fontSize: '15px', color: '#888', lineHeight: '1.6' }}>{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {content.education?.length > 0 && (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} style={{ padding: '120px 8vw', background: '#0a0a0a' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '48px', color: '#666' }}>Foundations</h2>
          {content.education.map((edu, i) => (
            <motion.div key={i} variants={blockVariants} style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '20px', fontWeight: '800', textTransform: 'uppercase' }}>{edu.degree}</div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>{edu.institution} // {edu.year}</div>
            </motion.div>
          ))}
        </motion.section>
      )}

      <footer style={{ padding: '100px 8vw', borderTop: '1px solid #222', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5em', color: '#444' }}>Portfolio Engineered for the Elite · {new Date().getFullYear()}</div>
      </footer>
    </motion.div>
  );
};

export default Bold;
