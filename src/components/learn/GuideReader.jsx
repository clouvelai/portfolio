import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { getGuide, guides, prepareGuide } from '../../content/guides'

function StepLink({ guide, direction }) {
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
    if (!guide) {
        return (
            <span className="inline-flex h-8 w-8 items-center justify-center text-gray-300" aria-hidden="true">
                <Icon size={18} />
            </span>
        )
    }

    return (
        <Link
            to={`/learn/${guide.slug}`}
            aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} guide: ${guide.title}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
            <Icon size={18} />
        </Link>
    )
}

export default function GuideReader() {
    const { slug } = useParams()
    const guide = getGuide(slug)
    const navigate = useNavigate()
    const frameRef = useRef(null)
    const [loaded, setLoaded] = useState(null)

    useEffect(() => {
        if (!guide) return undefined
        document.title = `${guide.title} · Learn AI`
        return () => {
            document.title = 'Samuel Clark - Portfolio'
        }
    }, [guide])

    useEffect(() => {
        if (!guide) return undefined
        let cancelled = false
        const slug = guide.slug
        guide.load()
            .then((module) => {
                if (!cancelled) setLoaded({ slug, html: prepareGuide(module.default) })
            })
            .catch(() => {
                if (!cancelled) setLoaded({ slug, failed: true })
            })
        return () => {
            cancelled = true
        }
    }, [guide])

    useEffect(() => {
        function onMessage(event) {
            if (event.source !== frameRef.current?.contentWindow) return
            const nextSlug = event.data?.type === 'learn-guide' ? event.data.slug : null
            if (nextSlug && guides.some((item) => item.slug === nextSlug)) {
                navigate(`/learn/${nextSlug}`)
            }
        }
        window.addEventListener('message', onMessage)
        return () => window.removeEventListener('message', onMessage)
    }, [navigate])

    if (!guide) return <Navigate to="/learn" replace />

    const index = guides.findIndex((item) => item.slug === guide.slug)
    const current = loaded?.slug === guide.slug ? loaded : null
    const html = current?.html || ''
    const failed = Boolean(current?.failed)

    return (
        <div className="fixed inset-0 z-40 flex flex-col bg-[#F4F5F7]">
            <header className="grid h-[52px] shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-gray-200/90 bg-white/90 px-3 backdrop-blur-md sm:px-5">
                <Link
                    to="/learn"
                    className="inline-flex items-center gap-1.5 justify-self-start text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                    <ArrowLeft size={16} />
                    <span className="hidden sm:inline">Guides</span>
                </Link>
                <h1 className="max-w-[42vw] truncate text-sm font-medium tracking-tight text-gray-900 sm:max-w-md">
                    {guide.title}
                </h1>
                <div className="flex items-center justify-self-end">
                    <StepLink guide={guides[index - 1]} direction="prev" />
                    <span className="w-12 text-center text-xs tabular-nums text-gray-400">{guide.number}</span>
                    <StepLink guide={guides[index + 1]} direction="next" />
                </div>
            </header>

            <div className="min-h-0 flex-1">
                {html ? (
                    <iframe
                        ref={frameRef}
                        key={guide.slug}
                        title={guide.title}
                        srcDoc={html}
                        className="h-full w-full border-0 bg-[#F4F5F7]"
                    />
                ) : (
                    <div className="grid h-full place-items-center px-6">
                        {failed ? (
                            <div className="text-center">
                                <p className="font-medium text-gray-900">This guide didn’t open.</p>
                                <Link to="/learn" className="mt-3 inline-block text-sm text-gray-600 underline decoration-gray-300 underline-offset-4">
                                    Back to guides
                                </Link>
                            </div>
                        ) : (
                            <div className="w-36 overflow-hidden">
                                <motion.div
                                    className="h-px w-full bg-gray-900"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ duration: 1.05, repeat: Infinity, ease: 'easeInOut' }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
