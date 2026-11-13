import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Honeypot from './components/Honeypot'
import SiteNav from './components/SiteNav'
import Learn from './components/learn/Learn'
import GuideLibrary from './components/learn/GuideLibrary'
import GuideReader from './components/learn/GuideReader'

function Portfolio() {
  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      <SiteNav />

      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>

      {/* Multiple Hidden Honeypot Links - Different techniques to catch various bot types */}
      <footer className="py-8 text-center text-gray-500 text-xs border-t border-gray-200">
        <p>&copy; {new Date().getFullYear()} Samuel Clark. Built with React.</p>

        {/* Technique 1: Opacity 0 + absolute positioning */}
        <a href="/sitemap-hidden.xml" className="opacity-0 absolute bottom-0 left-0 w-1 h-1 overflow-hidden" aria-hidden="true" tabIndex="-1">
          XML Sitemap
        </a>

        {/* Technique 2: Off-screen positioning */}
        <a href="/admin-login" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" tabIndex="-1">
          Admin Panel
        </a>

        {/* Technique 3: Zero size with overflow hidden */}
        <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
          <a href="/wp-admin" tabIndex="-1">WordPress Admin</a>
        </div>

        {/* Technique 4: Background color matched (invisible text) */}
        <a href="/api/internal/config" style={{ color: '#f9fafb', fontSize: '1px' }} aria-hidden="true" tabIndex="-1">
          API Config
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
        <Route path="/learn" element={<Learn />}>
          <Route index element={<GuideLibrary />} />
          <Route path=":slug" element={<GuideReader />} />
        </Route>
        {/* Multiple honeypot routes with different trap types */}
        <Route path="/sitemap-hidden.xml" element={<Honeypot />} />
        <Route path="/admin-login" element={<Honeypot />} />
        <Route path="/wp-admin" element={<Honeypot />} />
        <Route path="/api/internal/config" element={<Honeypot />} />
      </Routes>
    </Router>
  )
}
