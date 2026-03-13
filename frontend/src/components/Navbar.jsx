import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import useStore from '../store/useStore'

function Navbar() {
  const { user, reset, portfolioExists } = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    reset()
    navigate('/')
  }

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  if (isAuthPage) return null

  return (
    <nav style={{
      top: 0,
      width: '100%',
      zIndex: 1000,
      borderBottom: '1px solid var(--geist-border)',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'saturate(180%) blur(5px)',
      position: 'sticky'
    }}>
      <div className="container" style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: 'var(--geist-foreground)'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: 'var(--geist-foreground)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
             <div style={{ width: '12px', height: '12px', background: 'var(--geist-background)', borderRadius: '1px' }}></div>
          </div>
          <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.03em' }} className="font-heading">AI Portfolio.</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {user ? (
            <>
              <Link to={portfolioExists ? "/preview" : "/onboarding"} style={{
                fontSize: '13px',
                fontWeight: '500',
                color: 'var(--geist-secondary)',
                textDecoration: 'none',
                transition: 'var(--transition)'
              }} onMouseOver={(e) => e.target.style.color = 'var(--geist-foreground)'} onMouseOut={(e) => e.target.style.color = 'var(--geist-secondary)'}>
                Dashboard
              </Link>
              <div style={{ height: '16px', width: '1px', background: 'var(--geist-border)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--geist-foreground)', fontWeight: '600' }}>
                  {user.user_metadata?.full_name || user.email.split('@')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-geist btn-geist-secondary"
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                fontSize: '13px',
                fontWeight: '500',
                color: 'var(--geist-secondary)',
                textDecoration: 'none'
              }} onMouseOver={(e) => e.target.style.color = 'var(--geist-foreground)'} onMouseOut={(e) => e.target.style.color = 'var(--geist-secondary)'}>
                Sign In
              </Link>
              <Link to="/register" className="btn-geist btn-geist-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                Join Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar