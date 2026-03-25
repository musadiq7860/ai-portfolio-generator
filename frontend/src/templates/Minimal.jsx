import React from 'react';
import { motion } from 'framer-motion';

const Minimal = ({ content, githubData, metadata }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      padding: '120px 40px',
      lineHeight: '1.6'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.header variants={itemVariants} style={{ marginBottom: '120px' }}>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: '600', letterSpacing: '-0.04em', lineHeight: '1', marginBottom: '24px' }}>
            {content.name}
          </h1>
          <p style={{ fontSize: '18px', color: '#888', maxWidth: '600px', lineHeight: '1.6', marginBottom: '24px' }}>
            {metadata.role}
          </p>
          <div style={{ display: 'flex', gap: '20px', fontSize: '14px', alignItems: 'center' }}>
            {content.contact_details?.email && (
              <a href={`mailto:${content.contact_details.email}`} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>Email</a>
            )}
            {content.contact_details?.linkedin && (
              <a href={content.contact_details.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>LinkedIn</a>
            )}
            {githubData?.github_url && (
              <a href={githubData.github_url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>GitHub</a>
            )}
          </div>
          {content.one_liner && (
            <p style={{ fontSize: '14px', color: '#555', marginTop: '24px' }}>{content.one_liner}</p>
          )}
        </motion.header>

        <motion.section variants={itemVariants} style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', marginBottom: '32px' }}>Profile</h2>
          <p style={{ fontSize: '20px', fontWeight: '400', lineHeight: '1.6' }}>{content.bio}</p>
        </motion.section>

        {content.skills?.length > 0 && (
          <motion.section variants={itemVariants} style={{ marginBottom: '100px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', marginBottom: '32px' }}>Competencies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {content.skills.map((skill, i) => (
                <span key={i} style={{
                  fontSize: '12px',
                  color: '#999',
                  border: '1px solid #222',
                  padding: '6px 14px',
                  borderRadius: '2px'
                }}>{skill}</span>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section variants={itemVariants} style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', marginBottom: '32px' }}>Selected Works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {content.featured_projects?.map((project, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>{project.name}</h3>
                  <span style={{ fontSize: '10px', color: '#00ff88', fontWeight: '700', letterSpacing: '0.1em' }}>FEATURED</span>
                </div>
                <p style={{ color: '#888', fontSize: '15px', marginBottom: '24px', maxWidth: '600px', lineHeight: '1.7' }}>{project.description}</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {project.technologies?.map((tech, j) => (
                    <span key={j} style={{ fontSize: '11px', color: '#666', border: '1px solid #222', padding: '4px 8px', borderRadius: '2px' }}>{tech}</span>
                  ))}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#fff', textDecoration: 'none', marginLeft: 'auto' }}>View →</a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {content.other_projects?.length > 0 && (
          <motion.section variants={itemVariants} style={{ marginBottom: '100px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', marginBottom: '32px' }}>Other Projects</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#222', border: '1px solid #222' }}>
              {content.other_projects.map((project, i) => (
                <div key={i} style={{ background: '#000', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{project.name}</h4>
                    <p style={{ fontSize: '13px', color: '#666' }}>{project.description}</p>
                  </div>
                  <div style={{ fontSize: '10px', color: '#444' }}>{project.technologies?.slice(0, 2).join(' / ')}</div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {content.experience?.length > 0 && (
          <motion.section variants={itemVariants} style={{ marginBottom: '100px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', marginBottom: '32px' }}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {content.experience.map((exp, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{exp.title}</h4>
                  <div style={{ fontSize: '12px', color: '#555', marginBottom: '12px' }}>{exp.company} · {exp.duration}</div>
                  <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6' }}>{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {content.education?.length > 0 && (
          <motion.section variants={itemVariants} style={{ marginBottom: '100px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', marginBottom: '32px' }}>Education</h2>
            {content.education.map((edu, i) => (
              <motion.div key={i} variants={itemVariants} style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{edu.degree}</h4>
                <div style={{ fontSize: '13px', color: '#555' }}>{edu.institution} · {edu.year}</div>
              </motion.div>
            ))}
          </motion.section>
        )}

        <motion.footer variants={itemVariants} style={{ paddingTop: '60px', borderTop: '1px solid #222', fontSize: '12px', color: '#444' }}>
          &copy; {new Date().getFullYear()} {content.name}. Established via AI Portfolio.
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default Minimal;
