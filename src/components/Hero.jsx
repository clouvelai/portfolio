import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, Eye, Cpu, Terminal, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

const focusAreas = [
    {
        title: "AI Production",
        icon: <Eye size={24} />,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        dotColor: "bg-blue-500",
        items: [
            "Observability & Performance",
            "Governance & Guardrails",
            "Production Systems"
        ]
    },
    {
        title: "Agentic Engineering",
        icon: <Cpu size={24} />,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        dotColor: "bg-purple-500",
        items: [
            "Multi-agent Coordination",
            "Coding Agents",
            "Chaos Management"
        ]
    },
    {
        title: "Infrastructure",
        icon: <Terminal size={24} />,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
        dotColor: "bg-indigo-500",
        items: [
            "CUA Workflow",
            "MCP Discovery Protocols",
            "CI/CD Optimization"
        ]
    },
    {
        title: "Personal Interests",
        icon: <Heart size={24} />,
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
        dotColor: "bg-pink-500",
        items: [
            "Running",
            "Painting",
            "Vibe Coding",
            "RL Agents + Gym",
            "Bot Building",
            "Cooking",
            "French"
        ]
    }
]

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % focusAreas.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const currentArea = focusAreas[currentIndex]

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 pt-20">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-blue-600 font-semibold tracking-wider mb-6 uppercase text-xs">Samuel Clark</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-gray-900">
                        Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Intelligent Systems</span>,<br />
                        Responsibly.
                    </h1>
                    <p className="text-xl text-gray-600 max-w-xl mb-10 leading-relaxed font-light">
                        Software engineer and leader passionate about building robust, scalable, and human-centric AI solutions.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#projects" className="group bg-gray-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                            View Work
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#contact" className="px-8 py-4 rounded-full font-medium border border-gray-200 hover:bg-white/50 transition-colors backdrop-blur-sm text-gray-700">
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative hidden lg:block"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-white/60 shadow-xl min-h-[400px]"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-4 ${currentArea.iconBg} ${currentArea.iconColor} rounded-2xl`}>
                                    {currentArea.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{currentArea.title}</h3>
                            </div>

                            <ul className="space-y-3">
                                {currentArea.items.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3 text-gray-700"
                                    >
                                        <span className={`w-2 h-2 ${currentArea.dotColor} rounded-full flex-shrink-0`} />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Pagination Dots */}
                            <div className="flex gap-2 mt-8 justify-center">
                                {focusAreas.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all ${index === currentIndex ? 'bg-gray-900 w-8' : 'bg-gray-300 w-2'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce"
            >
                <ChevronDown size={24} />
            </motion.div>
        </section>
    )
}
