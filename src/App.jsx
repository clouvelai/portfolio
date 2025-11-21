import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import Honeypot from './components/Honeypot'
import { useAnalytics } from './hooks/useAnalytics'
import { useState, useEffect } from 'react'

function Portfolio() {
  useAnalytics() // Track visits
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm' : 'bg-transparent py-6'
        }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tighter text-gray-900">SC.</a>
          <div className="flex items-center gap-8">
            <a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <a href="#projects" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Projects</a>
            <a href="#analytics" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Analytics</a>
            <a href="#contact" className="text-sm px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Projects />
        <AnalyticsDashboard />
        <Contact />
      </main>

      {/* Hidden Honeypot Link */}
      <footer className="py-8 text-center text-gray-500 text-xs border-t border-gray-200">
        <p>&copy; {new Date().getFullYear()} Samuel Clark. Built with React & Supabase.</p>
        <a href="/sitemap-hidden.xml" className="opacity-0 absolute bottom-0 left-0 w-1 h-1 overflow-hidden" aria-hidden="true" tabIndex="-1">
          XML Sitemap
        </a>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/sitemap-hidden.xml" element={<Honeypot />} />
      </Routes>
    </Router>
  )
}
