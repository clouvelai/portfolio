import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Activity, Users, Bot, RefreshCw, ShieldAlert } from 'lucide-react'

function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
}

export default function AnalyticsDashboard() {
    const [visits, setVisits] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchVisits()
        // Real-time subscription
        const subscription = supabase
            .channel('visits')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visits' }, payload => {
                setVisits(prev => [payload.new, ...prev])
            })
            .subscribe()

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const fetchVisits = async () => {
        setRefreshing(true)
        try {
            const { data, error } = await supabase
                .from('visits')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10000)

            if (error) throw error
            setVisits(data || [])
        } catch (error) {
            console.error('Error fetching visits:', error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const handleRefresh = () => {
        fetchVisits()
    }

    const botCount = visits.filter(v => v.is_bot).length
    const humanCount = visits.length - botCount
    const trappedCount = visits.filter(v => v.trap_type).length
    const humanPercent = visits.length > 0 ? Math.round((humanCount / visits.length) * 100) : 0
    const botPercent = visits.length > 0 ? 100 - humanPercent : 0

    const statCards = [
        {
            key: 'ratio',
            render: () => (
                <div>
                    <div className="flex items-center gap-3 mb-4 text-gray-600">
                        <Bot size={20} />
                        <span className="text-sm font-medium">Human vs Bot Ratio</span>
                    </div>
                    <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-4xl font-bold text-green-600">{humanPercent}%</span>
                        <span className="text-lg text-gray-400">/</span>
                        <span className="text-4xl font-bold text-red-500">{botPercent}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-red-200 overflow-hidden mb-2">
                        <div
                            className="h-full rounded-full bg-green-500 transition-all duration-500"
                            style={{ width: `${humanPercent}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>{humanCount} humans</span>
                        <span>{botCount} bots</span>
                    </div>
                </div>
            ),
            className: 'bg-white border border-gray-200',
        },
        {
            key: 'total',
            render: () => (
                <div>
                    <div className="flex items-center gap-3 mb-4 text-gray-600">
                        <Users size={20} />
                        <span className="text-sm font-medium">Total Visits</span>
                    </div>
                    <p className="text-5xl font-bold text-gray-900">{visits.length}</p>
                </div>
            ),
            className: 'bg-white border border-gray-200',
        },
        {
            key: 'trapped',
            render: () => (
                <div>
                    <div className="flex items-center gap-3 mb-4 text-red-600">
                        <ShieldAlert size={20} />
                        <span className="text-sm font-medium">Bots Trapped</span>
                    </div>
                    <p className="text-5xl font-bold text-red-600">{trappedCount}</p>
                    <p className="text-xs text-red-400 mt-2">via honeypot detection</p>
                </div>
            ),
            className: 'bg-red-50 border border-red-200',
        },
    ]

    return (
        <section id="analytics" className="py-32 px-6 bg-gray-50/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-4xl font-bold mb-2 text-gray-900">Who's Visiting?</h2>
                            <p className="text-gray-600">Real-time bot detection and visitor intelligence.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-green-600 bg-green-100 px-4 py-2 rounded-full text-sm animate-pulse">
                                <Activity size={16} /> Live
                            </div>
                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                                Refresh
                            </button>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white border border-gray-200 rounded-3xl overflow-hidden p-8 md:p-10"
                >
                    {/* Row 1: Stat Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {statCards.map((card, index) => (
                            <motion.div
                                key={card.key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-2xl shadow-sm hover:shadow-md transition-all ${card.className}`}
                            >
                                {card.render()}
                            </motion.div>
                        ))}
                    </div>

                    {/* Row 2: Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Activity</h3>
                        <div className="max-h-[280px] overflow-y-auto space-y-2">
                            {loading ? (
                                <div className="text-center text-gray-500 py-8">Loading data...</div>
                            ) : visits.slice(0, 20).map((visit) => (
                                <div
                                    key={visit.id}
                                    className="flex items-center gap-3 rounded-xl p-3 bg-gray-50 text-sm"
                                >
                                    <span
                                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${visit.is_bot ? 'bg-red-500' : 'bg-green-500'}`}
                                    />
                                    <span className="font-medium text-gray-800 min-w-0 truncate">
                                        {visit.is_bot
                                            ? (visit.bot_name || 'Unknown Bot')
                                            : (visit.browser && visit.os ? `${visit.browser} on ${visit.os}` : 'Visitor')}
                                    </span>
                                    {visit.trap_type && (
                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-200 shrink-0">
                                            trapped
                                        </span>
                                    )}
                                    <span className="text-gray-400 truncate">{visit.path}</span>
                                    <span className="text-gray-400 text-xs ml-auto shrink-0">
                                        {timeAgo(visit.created_at)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
