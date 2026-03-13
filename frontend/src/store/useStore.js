import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      user: null,
      portfolio: null,
      githubData: null,
      onboarding: null,
      isLoading: false,
      portfolioExists: false,

      setUser: (user) => set({ user }),
      setPortfolio: (portfolio) => set({ 
        portfolio, 
        portfolioExists: !!portfolio 
      }),
      setGithubData: (githubData) => set({ githubData }),
      setOnboarding: (onboarding) => set({ onboarding }),
      setLoading: (isLoading) => set({ isLoading }),
      setPortfolioExists: (portfolioExists) => set({ portfolioExists }),

      reset: () => set({
        user: null,
        portfolio: null,
        githubData: null,
        onboarding: null,
        isLoading: false,
        portfolioExists: false
      })
    }),
    {
      name: 'portfolio-ai-storage',
    }
  )
)

export default useStore