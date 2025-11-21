import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Activity, Users, Bot, RefreshCw } from 'lucide-react'

export default function AnalyticsDashboard() {
    const [visits, setVisits] = useState([])
    const [loading, setLoading] = useState(true)
    const [lastUpdated, setLastUpdated] = useState(new Date())
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchVisits()
        // Real-time subscription
        const subscription = supabase
            .channel('visits')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visits' }, payload => {
                setVisits(prev => [payload.new, ...prev])
                setLastUpdated(new Date())
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
                .limit(100)

            if (error) throw error
            setVisits(data || [])
            setLastUpdated(new Date())
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
                            <h2 className="text-4xl font-bold mb-2 text-gray-900">Live Analytics</h2>
                            <p className="text-gray-600">Real-time visitor tracking.</p>
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
                    <p className="text-sm text-gray-500">
                        Last updated: {lastUpdated.toLocaleTimeString()}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-3 mb-4 text-gray-600">
                            <Users size={20} />
                            <span>Total Visits</span>
                        </div>
                        <p className="text-5xl font-bold text-gray-900">{visits.length}</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-3 mb-4 text-green-600">
                            <Users size={20} />
                            <span>Humans</span>
                        </div>
                        <p className="text-5xl font-bold text-gray-900">{humanCount}</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-3 mb-4 text-red-600">
                            <Bot size={20} />
                            <span>Bots</span>
                        </div>
                        <p className="text-5xl font-bold text-gray-900">{botCount}</p>
                    </motion.div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="font-medium text-sm text-gray-600">Recent Activity</h3>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="p-4 text-gray-500 font-medium">Time</th>
                                    <th className="p-4 text-gray-500 font-medium">Type</th>
                                    <th className="p-4 text-gray-500 font-medium">Path</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="3" className="p-8 text-center text-gray-500">Loading data...</td></tr>
                                ) : visits.map((visit) => (
                                    <tr key={visit.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-600 font-mono">
                                            {new Date(visit.created_at).toLocaleTimeString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${visit.is_bot
                                                ? 'bg-red-100 text-red-600 border border-red-200'
                                                : 'bg-green-100 text-green-600 border border-green-200'
                                                }`}>
                                                {visit.is_bot ? 'BOT' : 'HUMAN'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-700">{visit.path}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}
