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
  
  if (isLoading) return null
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  
  return children
}

const PublicRoute = ({ children }) => {
  const { user, portfolioExists } = useStore()
  
  if (user) {
    return <Navigate to={portfolioExists ? "/preview" : "/onboarding"} replace />
  }
  
  return children
}

function App() {
  const { setUser, setPortfolio, setPortfolioExists, setLoading } = useStore()

  useEffect(() => {
    const initSession = async () => {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      const initialUser = session?.user ?? null
      setUser(initialUser)

      if (initialUser) {
        const { data } = await supabase
          .from('portfolios')
          .select('*')
          .eq('user_id', initialUser.id)
          .single()
        
        if (data) {
          setPortfolio(data)
          setPortfolioExists(true)
        }
      }
      setLoading(false)
    }

    initSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const newUser = session?.user ?? null
      setUser(newUser)
      
      if (newUser) {
        const { data } = await supabase
          .from('portfolios')
          .select('*')
          .eq('user_id', newUser.id)
          .single()
        
        if (data) {
          setPortfolio(data)
          setPortfolioExists(true)
        } else {
          setPortfolio(null)
          setPortfolioExists(false)
        }
      } else {
        setPortfolio(null)
        setPortfolioExists(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser, setPortfolio, setPortfolioExists, setLoading])

  return (
    <>
      <div className="noise-overlay"></div>
      <div className="glow-bg"></div>
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