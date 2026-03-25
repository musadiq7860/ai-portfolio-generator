import React, { useState, useEffect } from 'react';

const stages = [
  'Analyzing GitHub repositories...',
  'Extracting LinkedIn credentials...',
  'Running AI synthesis engine...',
  'Generating professional narrative...',
  'Composing case studies...',
  'Calibrating visual identity...',
  'Finalizing portfolio architecture...'
];

const LoadingScreen = ({ message = 'Assembling vision...' }) => {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStageIndex(prev => (prev + 1) % stages.length);
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress(prev => prev < 95 ? prev + Math.random() * 3 : prev);
    }, 200);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--geist-background)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="noise-overlay"></div>

      <div style={{ position: 'relative', width: '48px', height: '48px', marginBottom: '48px' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '1.5px solid var(--geist-border)',
          borderRadius: '4px',
          animation: 'geist-spin 3s cubic-bezier(0.7, 0, 0.3, 1) infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          inset: '8px',
          border: '1px solid var(--geist-accent)',
          borderRadius: '50%',
          animation: 'geist-spin 2s cubic-bezier(0.7, 0, 0.3, 1) infinite reverse',
          opacity: 0.5
        }}></div>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: '700',
          color: 'var(--geist-foreground)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '12px',
          fontFamily: 'var(--font-heading)'
        }}>
          {message}
        </h2>
        <p style={{
          fontSize: '12px',
          color: 'var(--geist-secondary)',
          marginBottom: '32px',
          transition: 'opacity 0.5s ease',
          minHeight: '18px'
        }}>
          {stages[stageIndex]}
        </p>

        <div style={{
          width: '200px',
          height: '2px',
          background: 'var(--geist-border)',
          borderRadius: '1px',
          margin: '0 auto',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--geist-accent)',
            borderRadius: '1px',
            transition: 'width 0.3s ease'
          }}></div>
        </div>

        <p style={{
          fontSize: '10px',
          color: 'var(--geist-secondary)',
          marginTop: '12px',
          opacity: 0.5
        }}>
          {Math.round(progress)}% complete
        </p>
      </div>

      <style>{`
        @keyframes geist-spin {
          0% { transform: rotate(0deg); border-radius: 4px; border-color: var(--geist-border); }
          50% { transform: rotate(180deg); border-radius: 50%; border-color: var(--geist-accent); }
          100% { transform: rotate(360deg); border-radius: 4px; border-color: var(--geist-border); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
