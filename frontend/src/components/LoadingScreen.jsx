import React from 'react';

const LoadingScreen = ({ message = 'Assembling vision...' }) => {
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
      
      <div style={{ position: 'relative', width: '40px', height: '40px', marginBottom: '40px' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid var(--geist-border)',
          borderRadius: '4px',
          animation: 'geist-spin 3s cubic-bezier(0.7, 0, 0.3, 1) infinite'
        }}></div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontSize: '13px',
          fontWeight: '600',
          color: 'var(--geist-foreground)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          {message}
        </h2>
        <p style={{
          fontSize: '11px',
          color: 'var(--geist-secondary)',
          letterSpacing: '0.05em'
        }}>
          Engineering professional identity
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
