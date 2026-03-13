import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import LoadingScreen from '../components/LoadingScreen';

const Onboarding = () => {
  const { onboardingForm, setOnboardingForm, setGithubData, setOnboarding, user } = useStore();
  const { step, githubUrl, role, jobTarget, skillsToEmphasize, oneLiner, highlightedProjects } = onboardingForm;
  const [linkedinPdf, setLinkedinPdf] = useState(null);
  const [githubData, setLocalGithubData] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const navigate = useNavigate();

  const setStep = (s) => setOnboardingForm({ step: s });
  const setGithubUrl = (val) => setOnboardingForm({ githubUrl: val });
  const setRole = (val) => setOnboardingForm({ role: val });
  const setJobTarget = (val) => setOnboardingForm({ jobTarget: val });
  const setSkillsToEmphasize = (val) => setOnboardingForm({ skillsToEmphasize: val });
  const setOneLiner = (val) => setOnboardingForm({ oneLiner: val });
  const setHighlightedProjects = (val) => setOnboardingForm({ highlightedProjects: val });

  const handleFetchGithub = async () => {
    if (!githubUrl) return;
    console.log("DEBUG: Fetching GitHub repos for:", githubUrl);
    setLoading(true);
    setLoadingMessage('Fetching repositories...');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/github/repos?github_url=${githubUrl}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      console.log("DEBUG: Repos fetched successfully:", data.repos?.length);
      setLocalGithubData(data);
      setStep(2);
    } catch (err) {
      console.error("DEBUG: GitHub Fetch failed:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleProject = (name) => {
    if (highlightedProjects.includes(name)) {
      setHighlightedProjects(highlightedProjects.filter(p => p !== name));
    } else if (highlightedProjects.length < 3) {
      setHighlightedProjects([...highlightedProjects, name]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("DEBUG: Initiating Generation Match...");
    console.log("DEBUG: Payload Info:", { role, jobTarget, highlightedProjects, hasPdf: !!linkedinPdf });
    
    setLoading(true);
    setLoadingMessage('AI is synthesizing your identity...');

    try {
      const formData = new FormData();
      formData.append('github_url', githubUrl);
      formData.append('role', role);
      formData.append('job_target', jobTarget);
      formData.append('skills_to_emphasize', skillsToEmphasize);
      formData.append('one_liner', oneLiner);
      formData.append('highlighted_projects', JSON.stringify(highlightedProjects));
      formData.append('template', 'Minimal');
      formData.append('user_id', user.id);
      formData.append('username', user.email.split('@')[0]);
      formData.append('full_name', user.user_metadata?.full_name || '');
      formData.append('linkedin_pdf', linkedinPdf);

      console.log("DEBUG: Sending request to backend...");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/generate/portfolio`, {
        method: 'POST',
        body: formData,
      });

      console.log("DEBUG: Backend response status:", res.status);
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Generation failed.');

      console.log("DEBUG: Generation successful, data received.");
      setGithubData(githubData);
      setOnboarding({ role, targetJob: jobTarget, content: data });
      console.log("DEBUG: Store updated, navigating to /preview");
      navigate('/preview');
    } catch (error) {
      console.error("DEBUG: Generation CRITICAL failure:", error);
      alert(`Generation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen message={loadingMessage} />;

  return (
    <div className="container" style={{ padding: '120px 0', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '64px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ 
              flex: 1, 
              height: '2px', 
              background: step >= s ? 'var(--geist-foreground)' : 'var(--geist-border)',
              transition: 'background 0.3s ease'
            }}></div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Assemble your data.</h1>
            <p style={{ color: 'var(--geist-secondary)', marginBottom: '48px', fontSize: '14px' }}>Connect your GitHub to extract technical milestones.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <label className="label-geist">GitHub Repository URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="input-geist"
                />
              </div>
              <button onClick={handleFetchGithub} disabled={!githubUrl} className="btn-geist btn-geist-primary">
                Verify Source
              </button>
            </div>
          </div>
        )}

        {step === 2 && githubData && (
          <div className="animate-fade-in">
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Select key works.</h1>
            <p style={{ color: 'var(--geist-secondary)', marginBottom: '48px', fontSize: '14px' }}>Select up to 3 projects for deep AI analysis.</p>
            
            <div style={{ display: 'grid', gap: '1px', background: 'var(--geist-border)', border: '1px solid var(--geist-border)', marginBottom: '48px' }}>
              {githubData.repos.map(repo => (
                <div 
                  key={repo.name}
                  onClick={() => toggleProject(repo.name)}
                  style={{
                    padding: '20px',
                    background: highlightedProjects.includes(repo.name) ? 'rgba(0, 255, 136, 0.03)' : 'var(--geist-background)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{repo.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--geist-secondary)', textTransform: 'uppercase' }}>{repo.language || 'Documentation'}</span>
                  </div>
                  {highlightedProjects.includes(repo.name) && (
                    <span style={{ color: 'var(--geist-accent)', fontSize: '12px', fontWeight: '800' }}>SELECTED</span>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setStep(3)} disabled={highlightedProjects.length === 0} className="btn-geist btn-geist-primary">
              Continue to Details
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Finalize persona.</h1>
            <p style={{ color: 'var(--geist-secondary)', marginBottom: '48px', fontSize: '14px' }}>Refine how the AI interprets your professional narrative.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <label className="label-geist">Professional Title</label>
                <input type="text" placeholder="e.g. Senior Backend Engineer" value={role} onChange={e => setRole(e.target.value)} className="input-geist" />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label className="label-geist">Target Company/Goal</label>
                  <input type="text" placeholder="e.g. Stripe" value={jobTarget} onChange={e => setJobTarget(e.target.value)} className="input-geist" />
                </div>
                <div>
                  <label className="label-geist">Key Proficiencies</label>
                  <input type="text" placeholder="System Design, Rust" value={skillsToEmphasize} onChange={e => setSkillsToEmphasize(e.target.value)} className="input-geist" />
                </div>
              </div>

              <div>
                <label className="label-geist">Professional PDF / CV</label>
                <div style={{ 
                  border: '1px dashed var(--geist-border)', 
                  padding: '32px', 
                  borderRadius: '4px', 
                  textAlign: 'center',
                  background: 'var(--geist-card-bg)'
                }}>
                  <input type="file" accept=".pdf" onChange={e => setLinkedinPdf(e.target.files[0])} style={{ fontSize: '12px' }} />
                  <p style={{ fontSize: '11px', color: 'var(--geist-secondary)', marginTop: '8px' }}>LinkedIn export or manual CV preferred.</p>
                </div>
              </div>

              <button onClick={handleSubmit} disabled={!linkedinPdf || !role} className="btn-geist btn-geist-primary">
                Generate Official Portfolio
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default Onboarding;
