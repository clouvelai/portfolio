import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SiteNav({ variant = 'home' }) {
    const [scrolled, setScrolled] = useState(false)
    const solid = variant === 'interior' || scrolled

    useEffect(() => {
        if (variant !== 'home') return undefined
        const handleScroll = () => setScrolled(window.scrollY > 50)
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [variant])

    const linkClass = 'text-sm text-gray-600 hover:text-gray-900 transition-colors'
    const sectionHref = (hash) => (variant === 'home' ? hash : `/${hash}`)

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                {variant === 'home' ? (
                    <a href="#" className="text-xl font-bold tracking-tighter text-gray-900">SC.</a>
                ) : (
                    <Link to="/" className="text-xl font-bold tracking-tighter text-gray-900">SC.</Link>
                )}
                <div className="flex items-center gap-2.5 sm:gap-8">
                    <a href={sectionHref('#about')} className={linkClass}>About</a>
                    <a href={sectionHref('#projects')} className={linkClass}>Projects</a>
                    <Link to="/learn" className={variant === 'interior' ? 'text-sm text-gray-900' : linkClass}>Learn</Link>
                    <a href={sectionHref('#contact')} className="text-sm px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">Contact</a>
                </div>
            </div>
        </nav>
    )
}
