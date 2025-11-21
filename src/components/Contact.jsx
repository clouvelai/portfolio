import { motion } from 'framer-motion'
import { Mail, Linkedin, FileText } from 'lucide-react'

export default function Contact() {
    return (
        <section id="contact" className="py-32 px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500">
                        Let's work together.
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        I'm currently open to new opportunities.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="mailto:samuelmacarthurclark@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                            <Mail size={20} />
                            Email Me
                        </a>
                        <a href="/Samuel_Clark_CV_2025.pdf" download className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors text-gray-700">
                            <FileText size={20} />
                            Resume
                        </a>
                    </div>

                    <div className="mt-16 flex justify-center gap-8 text-gray-400">
                        <a href="https://www.linkedin.com/in/samclark77/" className="hover:text-gray-900 transition-colors"><Linkedin size={24} /></a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
