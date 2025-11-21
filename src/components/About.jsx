import { motion } from 'framer-motion'

const hobbies = [
    "Running", "Painting", "Vibe Coding", "RL Agents, Gym & Bot Building", "Cooking", "French", "Golf"
]

export default function About() {
    return (
        <section id="about-details" className="py-20 px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">Personal Interests</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {hobbies.map((hobby, index) => (
                            <span
                                key={index}
                                className="px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all cursor-default"
                            >
                                {hobby}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
