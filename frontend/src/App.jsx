import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { supabase } from './lib/supabase'
import useStore from './store/useStore'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import Preview from './pages/Preview'
import Portfolio from './pages/Portfolio'
import Navbar from './components/Navbar'

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useStore()
  const location = useLocation()
  
  console.log("DEBUG: ProtectedRoute state:", { user: !!user, isLoading });

  if (isLoading) return null
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  
  return children
}

const PublicRoute = ({ children }) => {
  const { user, portfolioExists, isLoading } = useStore()
  
  if (isLoading) return null
  if (user) {
    return <Navigate to={portfolioExists ? "/preview" : "/onboarding"} replace />
  }
  
  return children
}

function App() {
  const { setUser, setPortfolio, setPortfolioExists, setLoading } = useStore()
  const location = useLocation()
  const isPortfolioPage = location.pathname.startsWith('/portfolio/')

  useEffect(() => {
    const initSession = async () => {
      try {
        setLoading(true)
        const { data: { session } } = await supabase.auth.getSession()
        const initialUser = session?.user ?? null
        setUser(initialUser)

        if (initialUser) {
          const { data, error } = await supabase
            .from('portfolios')
            .select('*')
            .eq('user_id', initialUser.id)
            .maybeSingle()
          
          if (data) {
            setPortfolio(data)
            setPortfolioExists(true)
          } else {
            setPortfolio(null)
            setPortfolioExists(false)
          }
        }
      } catch (error) {
        console.error("Session init error:", error)
      } finally {
        setLoading(false)
      }
    }

    initSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("DEBUG: Auth State Changed:", _event);
      const newUser = session?.user ?? null
      setUser(newUser)
      
      if (newUser) {
        try {
          const { data } = await supabase
            .from('portfolios')
            .select('*')
            .eq('user_id', newUser.id)
            .maybeSingle()
          
          if (data) {
            setPortfolio(data)
            setPortfolioExists(true)
          } else {
            setPortfolio(null)
            setPortfolioExists(false)
          }
        } catch (err) {
          console.error("DEBUG: Portfolio fetch error on change:", err)
        }
      } else {
        setPortfolio(null)
        setPortfolioExists(false)
      }
      setLoading(false) // Final safety
    })

    return () => subscription.unsubscribe()
  }, [setUser, setPortfolio, setPortfolioExists, setLoading])

  useEffect(() => {
    // Failsafe: Reset loading after 5 seconds no matter what to prevent blank screens
    const timer = setTimeout(() => {
      const state = useStore.getState()
      if (state.isLoading) {
        console.warn("DEBUG: Initial loading took too long, forcing clear.");
        setLoading(false);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <>
      {!isPortfolioPage && <div className="noise-overlay"></div>}
      {!isPortfolioPage && <div className="glow-bg"></div>}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/preview" element={<ProtectedRoute><Preview /></ProtectedRoute>} />
        <Route path="/portfolio/:username" element={<Portfolio />} />
      </Routes>
    </>
  )
}

export default App