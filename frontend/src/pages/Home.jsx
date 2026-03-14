import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Home = () => {
  const navigate = useNavigate();
  const { setOnboarding, setGithubData } = useStore();
  const [githubUrl, setGithubUrl] = useState('https://github.com/musadiq7860');
  const [bio, setBio] = useState('full stack');
  const [template, setTemplate] = useState('Minimal');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setError('');
    setLoading(true);
    try {
      // Fetch GitHub data
      const ghRes = await fetch(`${import.meta.env.VITE_API_URL}/api/github/repos?github_url=${githubUrl}`);
      const ghData = await ghRes.json();
      
      if (!ghRes.ok || ghData.error) {
        throw new Error(ghData.error || 'Failed to fetch GitHub repositories.');
      }
      
      setGithubData(ghData);

      // Simple onboarding payload for backend
      const formData = new FormData();
      formData.append('github_url', githubUrl);
      formData.append('role', 'Developer'); // Default
      formData.append('job_target', '');
      formData.append('skills_to_emphasize', '');
      formData.append('one_liner', '');
      formData.append('highlighted_projects', '[]');
      formData.append('template', template);
      formData.append('user_id', 'anonymous');
      formData.append('username', ghData.username || 'user');
      formData.append('full_name', ghData.name || '');

      // We need a dummy linkedin_pdf to bypass validation if it's required
      // The backend uses UploadFile which requires a blobl file.
      const blob = new Blob(['dummy pdf content'], { type: 'application/pdf' });
      formData.append('linkedin_pdf', blob, 'dummy.pdf');

      const genRes = await fetch(`${import.meta.env.VITE_API_URL}/api/generate/portfolio`, {
        method: 'POST',
        body: formData
      });
      const genData = await genRes.json();

      if (!genRes.ok || genData.error) {
        throw new Error(genData.error || 'Failed to generate portfolio.');
      }

      setOnboarding({ role: 'Developer', targetJob: '', content: genData });
      navigate('/preview'); // Navigate to the preview page to show the generated portfolio
    } catch (err) {
      setError(err.message || 'Failed to fetch GitHub repositories.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#333', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#eee', marginBottom: '16px' }}>
          AI Developer Portfolio Generator
        </h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>
          Enter a GitHub username to generate a professional developer portfolio.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/username"
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              fontSize: '16px', 
              border: '1px solid #ccc', 
              borderRadius: '8px' 
            }}
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px', 
              background: '#000', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '24px',
            resize: 'vertical'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <span style={{ fontSize: '16px', color: '#666' }}>Template:</span>
          <button
            onClick={() => setTemplate('Minimal')}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              background: template === 'Minimal' ? '#f0f0f0' : 'transparent',
              color: template === 'Minimal' ? '#000' : '#666',
              border: template === 'Minimal' ? '1px solid #ccc' : '1px solid transparent',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            Minimal
          </button>
          <button
            onClick={() => setTemplate('Dark')}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              background: template === 'Dark' ? '#000' : 'transparent',
              color: template === 'Dark' ? '#fff' : '#666',
              border: template === 'Dark' ? '1px solid #000' : '1px solid transparent',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            Dark
          </button>
        </div>

        {error && (
          <div style={{ color: 'red', fontSize: '16px', marginTop: '16px' }}>
            {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
