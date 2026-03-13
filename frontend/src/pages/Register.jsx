import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import useStore from '../store/useStore';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });

      if (error) throw error;
      
      if (data.user && data.session) {
        setUser(data.user);
        navigate('/onboarding');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      let msg = err.message;
      if (msg.toLowerCase().includes('rate limit')) {
        msg = 'Security limit reached. Please wait a few minutes.';
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
           <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Join the elite.</h1>
           <p style={{ color: 'var(--geist-secondary)', fontSize: '14px' }}>Establish your digital presence today.</p>
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

        {success && (
          <div style={{ 
            background: 'rgba(0, 255, 136, 0.05)', 
            border: '1px solid rgba(0, 255, 136, 0.2)', 
            color: 'var(--geist-accent)', 
            padding: '24px', 
            borderRadius: '4px', 
            fontSize: '14px', 
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            <strong>Vision Sent.</strong><br />
            Check your inbox to finalize your membership.
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label className="label-geist">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Elon Musk"
              className="input-geist"
            />
          </div>

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
            {loading ? 'Processing...' : 'Deploy Identity'}
          </button>
        </form>

        <p style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px', color: 'var(--geist-secondary)' }}>
          Already a member?{' '}
          <Link to="/login" style={{ color: 'var(--geist-foreground)', fontWeight: '600', textDecoration: 'none' }}>
            Sign In
          </Link>
        </p>

        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: '12px', color: 'var(--geist-secondary)', textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
