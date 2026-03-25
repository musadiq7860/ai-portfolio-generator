import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { supabase } from '../lib/supabase';

import Terminal from '../templates/Terminal';
import Minimal from '../templates/Minimal';
import Bold from '../templates/Bold';
import Magazine from '../templates/Magazine';
import CardGrid from '../templates/CardGrid';

const Preview = () => {
  const { onboarding, githubData, setPortfolio, user } = useStore();
  const [selectedStyle, setSelectedStyle] = useState('Minimal');
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

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
    { name: 'Magazine', desc: 'Story-driven longitudinal layout.' },
    { name: 'CardGrid', desc: 'Structured grid artifact system.' }
  ];

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      const baseUsername = user.email ? user.email.split('@')[0] : 'dev';
      const uniqueUsername = `${baseUsername}-${Math.floor(Math.random() * 10000)}`;

      const portfolioData = {
        user_id: user.id,
        username: uniqueUsername,
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

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'API synchronization failed.');
      }
      
      const resData = await res.json();
      const finalData = (resData.data && resData.data.length > 0) ? resData.data[0] : portfolioData;

      setPortfolio(finalData);
      
      const shareableLink = `${window.location.origin}/portfolio/${portfolioData.username}`;
      
      // Fire-and-forget copying to prevent browser permission modals from hanging the UI
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareableLink).catch(() => {});
      }
      
      setIsSaving(false);
      navigate(`/portfolio/${portfolioData.username}`);
      
    } catch (error) {
      setIsSaving(false);
      alert(`Publish Error: ${error.message}`);
    }
  };

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      const username = user.email.split('@')[0];
      const url = `${import.meta.env.VITE_API_URL}/api/portfolio/${username}/cv`;
      window.open(url, '_blank');
    } catch (error) {
      alert('CV download failed. Publish your portfolio first.');
    } finally {
      setIsDownloading(false);
    }
  };

  const renderTemplate = () => {
    const props = {
      content: onboarding.content || {},
      githubData: githubData || {},
      metadata: { role: onboarding.role || 'Developer', target: onboarding.targetJob || '' }
    };

    switch (selectedStyle) {
      case 'Terminal': return <Terminal {...props} />;
      case 'Bold': return <Bold {...props} />;
      case 'Magazine': return <Magazine {...props} />;
      case 'CardGrid': return <CardGrid {...props} />;
      default: return <Minimal {...props} />;
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      
      {/* Floating Control Panel */}
      <div style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 24px',
        borderRadius: '100px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {styles.map((s) => (
            <button
              key={s.name}
              onClick={() => setSelectedStyle(s.name)}
              style={{
                background: selectedStyle === s.name ? '#fff' : 'transparent',
                color: selectedStyle === s.name ? '#000' : '#888',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
        
        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)' }}></div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleDownloadCV} 
            disabled={isDownloading}
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '8px 20px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {isDownloading ? '...' : 'CV PDF'}
          </button>
          <button 
            onClick={handlePublish} 
            disabled={isSaving}
            style={{
              background: '#fff',
              color: '#000',
              border: 'none',
              padding: '8px 24px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {isSaving ? '...' : 'Go Live →'}
          </button>
        </div>
      </div>

      {/* Live Template Container */}
      <div style={{ width: '100%', minHeight: '100vh', paddingBottom: '120px' }}>
        {renderTemplate()}
      </div>

    </div>
  );
};

export default Preview;
