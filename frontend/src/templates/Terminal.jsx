import React from 'react';
import { motion } from 'framer-motion';

const Terminal = ({ content, githubData, metadata }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
  };
  const lineVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, type: 'tween' } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#00ff88',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      padding: '40px 24px',
      lineHeight: '1.7'
    }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <motion.header variants={lineVariants} style={{ borderBottom: '1px solid #333', paddingBottom: '40px', marginBottom: '60px' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: '400', marginBottom: '16px', color: '#00ff00' }}>
            <span style={{ color: '#555' }}>$</span> whoami<br/>
            {content.name}
          </h1>
          <p style={{ fontSize: '16px', color: '#888', marginBottom: '24px' }}>
            <span style={{ color: '#555' }}>&gt;</span> {metadata.role}
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#888' }}>
            {content.contact_details?.email && (
              <a href={`mailto:${content.contact_details.email}`} style={{ color: '#00ff00', textDecoration: 'none' }}>[Email]</a>
            )}
            {content.contact_details?.linkedin && (
              <a href={content.contact_details.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#00ff00', textDecoration: 'none' }}>[LinkedIn]</a>
            )}
            {githubData?.github_url && (
              <a href={githubData.github_url} target="_blank" rel="noopener noreferrer" style={{ color: '#00ff00', textDecoration: 'none' }}>[GitHub]</a>
            )}
          </div>
          {content.one_liner && (
            <div style={{ fontSize: '13px', opacity: 0.6, marginTop: '8px' }}>{"// "}{content.one_liner}</div>
          )}
        </motion.header>

        <motion.section variants={lineVariants} style={{ marginBottom: '64px' }}>
          <div style={{ color: '#fff', marginBottom: '16px', fontSize: '12px', fontWeight: '600' }}>[ cat about_me.md ]</div>
          <p style={{ fontSize: '16px', maxWidth: '700px', lineHeight: '1.8' }}>{content.bio}</p>
        </motion.section>

        {content.skills?.length > 0 && (
          <motion.section variants={lineVariants} style={{ marginBottom: '64px' }}>
            <div style={{ color: '#fff', marginBottom: '16px', fontSize: '12px', fontWeight: '600' }}>[ echo $SKILLS | tr ',' '\n' ]</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {content.skills.map((skill, i) => (
                <motion.span key={i} whileHover={{ scale: 1.05 }} style={{
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  padding: '4px 12px',
                  fontSize: '12px',
                  borderRadius: '2px',
                  background: 'rgba(0, 255, 136, 0.03)',
                  cursor: 'default'
                }}>{skill}</motion.span>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section variants={lineVariants} style={{ marginBottom: '64px' }}>
          <div style={{ color: '#fff', marginBottom: '24px', fontSize: '12px', fontWeight: '600' }}>[ ls ./featured_projects --detail ]</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px' }}>
            {content.featured_projects?.map((project, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02, background: 'rgba(0, 255, 136, 0.05)' }} style={{
                border: '1px solid rgba(0, 255, 136, 0.25)',
                padding: '24px',
                borderRadius: '4px',
                background: 'rgba(0, 255, 136, 0.02)',
                transition: 'background 0.2s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{project.name}</span>
                  <span style={{ fontSize: '10px', background: 'rgba(0, 255, 136, 0.15)', padding: '2px 8px', borderRadius: '2px', letterSpacing: '0.1em' }}>FEATURED</span>
                </div>
                <p style={{ fontSize: '13px', marginBottom: '16px', opacity: 0.8, lineHeight: '1.6' }}>{project.description}</p>
                <div style={{ fontSize: '11px', opacity: 0.5 }}>{project.technologies?.join(' // ')}</div>
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#00ff88', marginTop: '12px', display: 'block', opacity: 0.7 }}>→ view source</a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {content.other_projects?.length > 0 && (
          <motion.section variants={lineVariants} style={{ marginBottom: '64px' }}>
            <div style={{ color: '#fff', marginBottom: '16px', fontSize: '12px', fontWeight: '600' }}>[ ls ./projects ]</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {content.other_projects.map((project, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: '1px solid rgba(0, 255, 136, 0.08)', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', minWidth: '180px' }}>{project.name}</span>
                  <span style={{ fontSize: '12px', opacity: 0.6, flex: 1 }}>{project.description}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {content.experience?.length > 0 && (
          <motion.section variants={lineVariants} style={{ marginBottom: '64px' }}>
            <div style={{ color: '#fff', marginBottom: '24px', fontSize: '12px', fontWeight: '600' }}>[ cat work_history.log ]</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {content.experience.map((exp, i) => (
                <div key={i} style={{ paddingLeft: '16px', borderLeft: '2px solid rgba(0, 255, 136, 0.3)' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{exp.title}</div>
                  <div style={{ fontSize: '12px', opacity: 0.5, marginBottom: '8px' }}>{exp.company} // {exp.duration}</div>
                  <p style={{ fontSize: '13px', opacity: 0.7, lineHeight: '1.6' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {content.education?.length > 0 && (
          <motion.section variants={lineVariants} style={{ marginBottom: '64px' }}>
            <div style={{ color: '#fff', marginBottom: '16px', fontSize: '12px', fontWeight: '600' }}>[ cat education.log ]</div>
            {content.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{edu.degree}</div>
                <div style={{ fontSize: '12px', opacity: 0.5 }}>{edu.institution} // {edu.year}</div>
              </div>
            ))}
          </motion.section>
        )}

        <motion.section variants={lineVariants} style={{ marginBottom: '64px' }}>
          <div style={{ color: '#fff', marginBottom: '16px', fontSize: '12px', fontWeight: '600' }}>[ ./fetch_raw_artifacts.sh ]</div>
          <div style={{ opacity: 0.4, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {githubData?.repos?.slice(0, 12).map((repo, i) => (
              <div key={i}>→ {repo.name} {repo.language ? `[${repo.language}]` : ''} {repo.stars > 0 ? `★${repo.stars}` : ''}</div>
            ))}
          </div>
        </motion.section>

        <motion.footer variants={lineVariants} style={{ marginTop: '120px', fontSize: '10px', opacity: 0.3, textAlign: 'center', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          terminal protocol active // end of archive // {new Date().getFullYear()}
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default Terminal;
