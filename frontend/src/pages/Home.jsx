import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Home = () => {
  const navigate = useNavigate();
  const { user, portfolioExists } = useStore();

  useEffect(() => {
    if (user) {
      navigate(portfolioExists ? "/preview" : "/onboarding");
    }
  }, [user, portfolioExists, navigate]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--geist-background)' }}>
      <main className="container" style={{ padding: '160px 0 100px' }}>
        <div style={{ maxWidth: '800px', marginBottom: '80px' }}>
          <div style={{ 
            display: 'inline-block', 
            padding: '4px 12px', 
            background: 'var(--geist-card-bg)', 
            border: '1px solid var(--geist-border)',
            borderRadius: '2px',
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '32px',
            color: 'var(--geist-secondary)'
          }}>
            Llama 3.3 Engineered
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(48px, 8vw, 100px)', 
            lineHeight: '0.85', 
            marginBottom: '40px' 
          }}>
            Your Professional <br />
            <span style={{ color: 'var(--geist-secondary)' }}>Identity,</span> Redefined.
          </h1>

          <p style={{ 
            fontSize: '20px', 
            color: 'var(--geist-secondary)', 
            maxWidth: '540px', 
            lineHeight: '1.5',
            marginBottom: '48px',
            fontWeight: '400'
          }}>
            Transform open-source contributions and career milestones into a bold, editorial visual masterpiece. Built for the elite engineer.
          </p>

          <div style={{ display: 'flex', gap: '16px' }}>
            {user ? (
              <Link to={portfolioExists ? "/preview" : "/onboarding"} className="btn-geist btn-geist-primary" style={{ padding: '16px 32px', fontSize: '15px' }}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-geist btn-geist-primary" style={{ padding: '16px 32px', fontSize: '15px' }}>
                  Deploy Your Portfolio
                </Link>
                <Link to="/login" className="btn-geist btn-geist-secondary" style={{ padding: '16px 32px', fontSize: '15px' }}>
                  Member Access
                </Link>
              </>
            )}
          </div>
        </div>

        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1px', 
          background: 'var(--geist-border)',
          border: '1px solid var(--geist-border)',
          marginTop: '120px'
        }}>
          {[
            { title: 'AI Synthesis', desc: 'Deep analysis of repository patterns and code quality.' },
            { title: 'Editorial Polish', desc: 'Bespoke layouts that feel human-designed, not generated.' },
            { title: 'Global Edge', desc: 'Instant deployment to a high-speed professional network.' }
          ].map((feature, i) => (
            <div key={i} style={{ padding: '48px', background: 'var(--geist-background)' }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>{feature.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--geist-secondary)', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="container" style={{ 
        padding: '60px 0', 
        borderTop: '1px solid var(--geist-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'var(--geist-secondary)',
        fontSize: '12px'
      }}>
        <span>&copy; 2026 AI Portfolio. Built for scale.</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Systems</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
