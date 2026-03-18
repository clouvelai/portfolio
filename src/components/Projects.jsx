// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, Sparkles, Search, Palette, Activity, Database, BrainCircuit, LayoutTemplate, Blocks, Play, Dumbbell, Eye, MessageSquare, Dna, Zap, Trophy } from 'lucide-react'

const projects = [
    {
        title: "Clouvel",
        subtitle: "AI Illustrator of Reddit",
        description: "A LangChain-based multi-agent system that discovers artistic potential in Reddit conversations and transforms them into impressionist-style illustrations.",
        tags: ["Python", "LangChain", "OpenAI", "Reddit API", "Claude Code", "Cursor"],
        link: "https://clouvel.ai/",
        github: "#",
        gradient: "from-orange-500/10 via-red-500/10 to-pink-500/10",
        workflow: [
            {
                icon: <Search size={20} />,
                title: "Discovery Agent",
                description: "Scans Reddit for posts with high artistic potential",
                color: "text-blue-600",
                bg: "bg-blue-50"
            },
            {
                icon: <Sparkles size={20} />,
                title: "Distillation Agent",
                description: "Extracts and refines post content into creative concepts",
                color: "text-purple-600",
                bg: "bg-purple-50"
            },
            {
                icon: <Palette size={20} />,
                title: "Generation Agent",
                description: "Creates impressionist-style artwork from refined ideas",
                color: "text-pink-600",
                bg: "bg-pink-50"
            }
        ]
    },
    {
        title: "KalshiFlow",
        subtitle: "Realtime Market Analysis Engine",
        description: "A scalable event-based analysis engine processing realtime market data from the Kalshi Prediction Market to surface trends and insights. The frontend is entirely websocket/event driven.",
        tags: ["Starlette", "Supabase", "Gymnasium", "SB3", "Claude Code", "Cursor"],
        link: "https://kalshiflow.io/",
        github: "#",
        gradient: "from-blue-500/10 via-cyan-500/10 to-emerald-500/10",
        workflow: [
            {
                icon: <Activity size={20} />,
                title: "Data Streaming",
                description: "Stream kalshi data (trades, order books, markets)",
                color: "text-blue-600",
                bg: "bg-blue-50"
            },
            {
                icon: <Database size={20} />,
                title: "Processing & Storage",
                description: "Process, aggregate, and store",
                color: "text-cyan-600",
                bg: "bg-cyan-50"
            },
            {
                icon: <BrainCircuit size={20} />,
                title: "RL Training",
                description: "RL Training + Agent actions",
                color: "text-emerald-600",
                bg: "bg-emerald-50"
            }
        ]
    },
    {
        title: "Cobblr",
        subtitle: "Block-Based Coding IDE for Kids",
        description: "A visual programming environment where kids ages 3-16 build games and animations by dragging code blocks. An AI coding buddy named Pip helps them learn, debug, and create.",
        tags: ["React", "TypeScript", "Tailwind", "Blockly", "FastAPI", "Python", "Supabase", "Claude API", "Canvas 2D", "Playwright"],
        link: "#",
        github: "https://github.com/clouvelai/cobblr",
        gradient: "from-purple-500/10 via-violet-500/10 to-indigo-500/10",
        workflow: [
            {
                icon: <LayoutTemplate size={20} />,
                title: "Pick a Template",
                description: "Kids choose from progressive starter projects organized by difficulty, from simple line drawings to full sprite-based games",
                color: "text-blue-600",
                bg: "bg-blue-50"
            },
            {
                icon: <Blocks size={20} />,
                title: "Code with Blocks",
                description: "Drag-and-drop visual blocks snap together into programs, with Draw Mode for younger kids and Build Mode for the full workspace",
                color: "text-purple-600",
                bg: "bg-purple-50"
            },
            {
                icon: <Play size={20} />,
                title: "Run & Iterate with Pip",
                description: "Hit the green flag to execute code on a live canvas while Pip, an AI assistant powered by Claude, helps debug and teach",
                color: "text-pink-600",
                bg: "bg-pink-50"
            }
        ]
    },
    {
        title: "EndorArena",
        subtitle: "Train Your Own Soccer AI",
        description: "An interactive RL training playground where you train a reinforcement learning agent to play soccer, watch it learn in real-time 3D, and coach its behavior with natural language that an LLM translates into reward weight adjustments.",
        tags: ["Python", "React", "TypeScript", "Three.js", "FastAPI", "Stable Baselines3", "Gymnasium", "Supabase", "Docker"],
        link: "#",
        github: "https://github.com/clouvelai/EndorArena",
        gradient: "from-orange-500/10 via-red-500/10 to-pink-500/10",
        workflow: [
            {
                icon: <Dumbbell size={20} />,
                title: "Train",
                description: "Configure reward weights and kick off PPO training — a MaskablePPO agent learns to chase, possess, and score on a continuous 105×68 pitch with 17 discrete actions",
                color: "text-orange-600",
                bg: "bg-orange-50"
            },
            {
                icon: <Eye size={20} />,
                title: "Watch",
                description: "Live 3D visualization streams agent and ball positions at 10fps via WebSocket to a React Three Fiber pitch with stadium lights, goal celebrations, and ball trails",
                color: "text-blue-600",
                bg: "bg-blue-50"
            },
            {
                icon: <MessageSquare size={20} />,
                title: "Coach",
                description: "Type natural language instructions like \"be more aggressive\" and an LLM translates them into reward weight changes applied on the next training run",
                color: "text-purple-600",
                bg: "bg-purple-50"
            }
        ]
    },
    {
        title: "EvoGolf",
        subtitle: "3D Golf × Genetic Programming",
        description: "A 3D golf game where players evolve optimal swing strategies through genetic programming. Watch populations of golf balls launch, compete, and evolve across generations until one sinks the hole.",
        tags: ["React", "Three.js", "React Three Fiber", "SpacetimeDB", "TypeScript", "Docker"],
        link: "#",
        github: "https://github.com/clouvelai/EvoGolf",
        gradient: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
        workflow: [
            {
                icon: <Dna size={20} />,
                title: "Population Init",
                description: "Generate GP program trees using ramped half-and-half initialization",
                color: "text-green-600",
                bg: "bg-green-50"
            },
            {
                icon: <Zap size={20} />,
                title: "Evolution",
                description: "Tournament selection, subtree crossover, and mutation across generations",
                color: "text-emerald-600",
                bg: "bg-emerald-50"
            },
            {
                icon: <Trophy size={20} />,
                title: "Hole-in-One",
                description: "Winning genome found — celebrate and replay the perfect trajectory",
                color: "text-teal-600",
                bg: "bg-teal-50"
            }
        ]
    }
]

export default function Projects() {
    return (
        <section id="projects" className="py-32 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <div className="grid gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-orange-200 hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 p-8 md:p-10">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-4xl font-bold text-gray-900">{project.title}</h3>
                                            <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200 rounded-full text-xs font-semibold text-orange-700">
                                                Featured
                                            </span>
                                        </div>
                                        <p className="text-lg text-gray-500 mb-4">{project.subtitle}</p>
                                        <p className="text-gray-700 leading-relaxed max-w-3xl">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        {project.github && project.github !== "#" && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-gray-100 rounded-xl hover:bg-white hover:text-blue-600 transition-all text-gray-500 shadow-sm hover:shadow-md"
                                                aria-label="View on GitHub"
                                            >
                                                <Github size={20} />
                                            </a>
                                        )}
                                        {project.link && project.link !== "#" ? (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                            >
                                                Visit Site
                                                <ArrowUpRight size={18} />
                                            </a>
                                        ) : project.github && project.github !== "#" && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                            >
                                                View Code
                                                <Github size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-600 font-medium group-hover:bg-white/70 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Workflow */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Agent Workflow</h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {project.workflow.map((step, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + i * 0.1 }}
                                                className={`${step.bg} border border-gray-200 p-5 rounded-2xl hover:shadow-md transition-all`}
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className={`${step.color}`}>
                                                        {step.icon}
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-400">STEP {i + 1}</span>
                                                </div>
                                                <h5 className="font-bold text-gray-900 mb-2">{step.title}</h5>
                                                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
