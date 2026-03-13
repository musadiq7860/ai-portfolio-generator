import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import ProjectCard from '../components/ProjectCard';

const Preview = () => {
  const { onboarding, githubData, setPortfolio, user } = useStore();
  const [selectedStyle, setSelectedStyle] = useState('Minimal');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  console.log("DEBUG: Preview page reached. Content present:", !!onboarding?.content);

  if (!onboarding || !onboarding.content) {
    return (
      <div className="container" style={{ padding: '160px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Identity not found.</h2>
        <p style={{ color: 'var(--geist-secondary)', marginBottom: '32px' }}>Please complete the onboarding flow first.</p>
        <button onClick={() => navigate('/onboarding')} className="btn-geist btn-geist-primary">Initiate Onboarding</button>
      </div>
    );
  }

  const styles = [
    { name: 'Minimal', desc: 'Clean, Swiss-inspired typography.' },
    { name: 'Bold', desc: 'High contrast, editorial impacts.' },
    { name: 'Terminal', desc: 'Dev-centric command line aesthetic.' },
    { name: 'Magazine', desc: 'Story-driven longitudinal layout.' }
  ];

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      const portfolioData = {
        user_id: user.id,
        username: user.email.split('@')[0],
        style: selectedStyle,
        content: onboarding.content,
        github_data: githubData,
        focus_role: onboarding.role,
        target_job: onboarding.targetJob,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolioData)
      });

      if (!res.ok) throw new Error('Failed to synchronize identity.');

      setPortfolio(portfolioData);
      navigate(`/portfolio/${portfolioData.username}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container" style={{ padding: '120px 0' }}>
      <header style={{ marginBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '40px', marginBottom: '12px' }}>Review & Deploy</h1>
          <p style={{ color: 'var(--geist-secondary)', fontSize: '14px' }}>AI has synthesized your technical narrative. Choose a visual language.</p>
        </div>
        <button onClick={handlePublish} disabled={isSaving} className="btn-geist btn-geist-primary" style={{ padding: '12px 32px' }}>
          {isSaving ? 'Synchronizing...' : 'Go Live'}
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          <section>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--geist-secondary)', marginBottom: '32px' }}>Narrative Synthesis</h3>
            <div className="card-editorial" style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--geist-foreground)' }}>
              {onboarding.content.bio}
            </div>
          </section>

          <section>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--geist-secondary)', marginBottom: '32px' }}>Key Case Studies</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {onboarding.content.featured_projects?.map((project, idx) => (
                <ProjectCard key={idx} project={project} isFeatured={true} />
              ))}
            </div>
          </section>

          <section>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--geist-secondary)', marginBottom: '32px' }}>Professional History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--geist-border)', border: '1px solid var(--geist-border)' }}>
              {onboarding.content.experience?.map((exp, i) => (
                <div key={i} style={{ padding: '32px', background: 'var(--geist-background)' }}>
                  <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{exp.title}</div>
                  <div style={{ color: 'var(--geist-secondary)', fontSize: '12px', marginBottom: '16px' }}>{exp.company} • {exp.duration}</div>
                  <p style={{ fontSize: '14px', color: 'var(--geist-secondary)', lineHeight: '1.5' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside>
          <div style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--geist-secondary)', marginBottom: '32px' }}>Visual System</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {styles.map((s) => (
                <div 
                  key={s.name}
                  onClick={() => setSelectedStyle(s.name)}
                  style={{ 
                    cursor: 'pointer',
                    paddingLeft: '16px',
                    borderLeft: `2px solid ${selectedStyle === s.name ? 'var(--geist-foreground)' : 'var(--geist-border)'}`,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px', color: selectedStyle === s.name ? 'var(--geist-foreground)' : 'var(--geist-secondary)' }}>{s.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--geist-secondary)' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Preview;
