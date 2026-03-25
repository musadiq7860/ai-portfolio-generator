import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import LoadingScreen from '../components/LoadingScreen';

import Terminal from '../templates/Terminal';
import Minimal from '../templates/Minimal';
import Bold from '../templates/Bold';
import Magazine from '../templates/Magazine';
import CardGrid from '../templates/CardGrid';

const Portfolio = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/${username}`);
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.detail || 'Portfolio not found');
        }
        const data = await res.json();
        if (data) setPortfolio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--geist-background)', color: 'var(--geist-secondary)', fontFamily: 'var(--font-heading)', fontSize: '12px', letterSpacing: '0.2em', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
      LOADING
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }`}</style>
    </div>
  );
  if (error || !portfolio) return (
    <div className="container" style={{ padding: '160px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '72px', fontWeight: '800', marginBottom: '16px', fontFamily: 'var(--font-heading)', opacity: 0.1 }}>404</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Identity Not Established.</h2>
      <p style={{ color: 'var(--geist-secondary)', fontSize: '14px' }}>No portfolio found for @{username}</p>
    </div>
  );

  const renderTemplate = () => {
    const props = {
      content: portfolio.content || {},
      githubData: portfolio.github_data || {},
      metadata: { role: portfolio.focus_role || 'Developer', target: portfolio.target_job || '' }
    };

    switch (portfolio.style) {
      case 'Terminal': return <Terminal {...props} />;
      case 'Bold': return <Bold {...props} />;
      case 'Magazine': return <Magazine {...props} />;
      case 'CardGrid': return <CardGrid {...props} />;
      default: return <Minimal {...props} />;
    }
  };

    const handleCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      alert("Portfolio URL copied to your clipboard!");
    };

    return (
      <div className="portfolio-viewer" style={{ minHeight: '100vh' }}>
        {renderTemplate()}
      </div>
    );
};

export default Portfolio;
