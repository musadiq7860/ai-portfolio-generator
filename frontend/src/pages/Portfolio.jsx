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

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await supabase
        .from('portfolios')
        .select('*')
        .eq('username', username)
        .single();

      if (data) setPortfolio(data);
      setLoading(false);
    };
    fetchPortfolio();
  }, [username]);

  if (loading) return <LoadingScreen message="Accessing identity pool..." />;
  if (!portfolio) return (
    <div className="container" style={{ padding: '160px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px' }}>404: Identity Not Established.</h1>
    </div>
  );

  const renderTemplate = () => {
    const props = { 
      content: portfolio.content, 
      githubData: portfolio.github_data,
      metadata: { role: portfolio.focus_role, target: portfolio.target_job }
    };

    switch (portfolio.style) {
      case 'Terminal': return <Terminal {...props} />;
      case 'Bold': return <Bold {...props} />;
      case 'Magazine': return <Magazine {...props} />;
      case 'CardGrid': return <CardGrid {...props} />;
      default: return <Minimal {...props} />;
    }
  };

  return (
    <div className="portfolio-viewer">
      {renderTemplate()}
      <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 1000 }}>
        <button
          onClick={() => window.open(`${import.meta.env.VITE_API_URL}/api/portfolio/${username}/cv`, '_blank')}
          className="btn-geist btn-geist-secondary"
          style={{ 
            padding: '12px 24px', 
            borderRadius: '100px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            border: '1px solid var(--geist-border)'
          }}
        >
          Download CV PDF
        </button>
      </div>
    </div>
  );
};

export default Portfolio;
