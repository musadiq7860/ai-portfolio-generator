import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import useStore from '../store/useStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const portfolioExists = useStore((state) => state.portfolioExists);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      setUser(data.user);
      navigate(portfolioExists ? '/preview' : '/onboarding');
    } catch (err) {
      let msg = err.message;
      if (msg.toLowerCase().includes('invalid login credentials')) {
        msg = 'Incorrect email or password. Please try again.';
      } else if (msg.toLowerCase().includes('email not confirmed')) {
        msg = 'Verification required. Please check your inbox.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
           <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome back.</h1>
           <p style={{ color: 'var(--geist-secondary)', fontSize: '14px' }}>Sign in to manage your professional identity.</p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(255, 80, 80, 0.05)', 
            border: '1px solid rgba(255, 80, 80, 0.2)', 
            color: '#ff8080', 
            padding: '16px', 
            borderRadius: '4px', 
            fontSize: '13px', 
            marginBottom: '32px' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label className="label-geist">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input-geist"
            />
          </div>

          <div>
            <label className="label-geist">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-geist"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-geist btn-geist-primary" style={{ marginTop: '12px' }}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px', color: 'var(--geist-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--geist-foreground)', fontWeight: '600', textDecoration: 'none' }}>
            Create one
          </Link>
        </p>

        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: '12px', color: 'var(--geist-secondary)', textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
