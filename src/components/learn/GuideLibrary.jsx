import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SiteNav from '../SiteNav'
import { guides } from '../../content/guides'

export default function GuideLibrary() {
    useEffect(() => {
        document.title = 'Learn AI · Samuel Clark'
        return () => {
            document.title = 'Samuel Clark - Portfolio'
        }
    }, [])

    return (
        <div className="min-h-screen">
            <SiteNav variant="interior" />
            <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute top-0 right-0 w-[720px] h-[720px] bg-blue-400/10 rounded-full blur-[120px]" />
                <div className="pointer-events-none absolute top-48 -left-24 w-[520px] h-[520px] bg-purple-400/10 rounded-full blur-[120px]" />

                <div className="relative max-w-3xl mx-auto px-6 pt-32 pb-28">
                    <motion.header
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-blue-600">Field guides</p>
                        <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">Learn AI</h1>
                        <p className="mt-5 max-w-xl text-lg text-gray-600 font-light leading-relaxed">
                            Seven interactive notes on how language models work, from a single dot product to the exam that scores them.
                        </p>
                    </motion.header>

                    <ol className="mt-14 border-t border-gray-200/80">
                        {guides.map((guide, index) => (
                            <motion.li
                                key={guide.slug}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.08 + index * 0.045, ease: 'easeOut' }}
                            >
                                <Link
                                    to={`/learn/${guide.slug}`}
                                    className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 sm:gap-8 py-6 sm:py-7 border-b border-gray-200/80"
                                >
                                    <span className="font-mono text-[13px] tracking-wide text-gray-400 transition-colors group-hover:text-blue-600">
                                        {guide.number}
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-[1.35rem] sm:text-2xl font-semibold tracking-tight text-gray-900">
                                            {guide.title}
                                        </span>
                                        <span className="mt-1 block text-sm sm:text-[15px] font-light leading-relaxed text-gray-500">
                                            {guide.topic}
                                        </span>
                                    </span>
                                    <ArrowUpRight
                                        size={18}
                                        className="text-gray-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gray-900"
                                    />
                                </Link>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}
