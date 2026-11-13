import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import SiteNav from '../SiteNav'

const PIN = '7790'
const LENGTH = 4

export default function PinGate({ onUnlock }) {
    const [digits, setDigits] = useState(() => Array(LENGTH).fill(''))
    const [shake, setShake] = useState(0)
    const [status, setStatus] = useState('')
    const inputs = useRef([])

    useEffect(() => {
        document.title = 'Learn AI · Samuel Clark'
        inputs.current[0]?.focus()
        return () => {
            document.title = 'Samuel Clark - Portfolio'
        }
    }, [])

    useEffect(() => {
        if (shake > 0) inputs.current[0]?.focus()
    }, [shake])

    function write(next) {
        if (next.some((digit) => digit === '')) {
            setDigits(next)
            setStatus('')
            const focusAt = next.findIndex((digit) => digit === '')
            inputs.current[focusAt]?.focus()
            return
        }

        if (next.join('') === PIN) {
            setDigits(next)
            setStatus('Unlocked')
            onUnlock()
            return
        }

        setDigits(Array(LENGTH).fill(''))
        setShake((count) => count + 1)
        setStatus('Incorrect code')
    }

    function onChange(index, value) {
        const typed = value.replace(/\D/g, '')
        if (typed.length > 1) {
            const next = Array(LENGTH).fill('')
            typed.slice(0, LENGTH).split('').forEach((digit, slot) => {
                next[slot] = digit
            })
            write(next)
            return
        }
        const next = [...digits]
        next[index] = typed
        if (!typed) {
            setDigits(next)
            return
        }
        write(next)
    }

    function onKeyDown(index, event) {
        if (event.key === 'Backspace') {
            event.preventDefault()
            const next = [...digits]
            if (next[index]) {
                next[index] = ''
                setDigits(next)
                return
            }
            if (index > 0) {
                next[index - 1] = ''
                setDigits(next)
                inputs.current[index - 1]?.focus()
            }
        }
        if (event.key === 'ArrowLeft' && index > 0) inputs.current[index - 1]?.focus()
        if (event.key === 'ArrowRight' && index < LENGTH - 1) inputs.current[index + 1]?.focus()
    }

    function onPaste(event) {
        const text = event.clipboardData?.getData('text') || ''
        const pasted = text.replace(/\D/g, '').slice(0, LENGTH).split('')
        if (!pasted.length) return
        event.preventDefault()
        const next = Array(LENGTH).fill('')
        pasted.forEach((digit, index) => {
            next[index] = digit
        })
        write(next)
    }

    return (
        <div className="min-h-screen">
            <SiteNav variant="interior" />
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
                <div className="absolute top-0 right-0 w-[720px] h-[720px] bg-blue-400/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[560px] h-[560px] bg-purple-400/10 rounded-full blur-[120px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="relative w-full max-w-md text-center"
                >
                    <p className="text-xs font-semibold tracking-[0.22em] uppercase text-blue-600">Field guides</p>
                    <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">Learn AI</h1>
                    <p className="mt-4 text-lg text-gray-600 font-light">Field notes on how language models work.</p>

                    <motion.div
                        key={shake}
                        animate={shake ? { x: [0, -12, 12, -8, 8, -3, 3, 0] } : { x: 0 }}
                        transition={{ duration: 0.42 }}
                        className="mt-12 flex justify-center gap-3"
                        role="group"
                        aria-label="Four digit code"
                        onPaste={onPaste}
                    >
                        {digits.map((digit, index) => (
                            <input
                                key={index}
                                ref={(node) => { inputs.current[index] = node }}
                                value={digit}
                                onChange={(event) => onChange(index, event.target.value)}
                                onKeyDown={(event) => onKeyDown(index, event)}
                                onFocus={(event) => event.target.select()}
                                inputMode="numeric"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck={false}
                                maxLength={1}
                                aria-label={`Digit ${index + 1} of ${LENGTH}`}
                                className="h-[4.5rem] w-14 sm:w-16 rounded-2xl border border-gray-200 bg-white/80 text-center text-2xl font-medium text-gray-900 shadow-sm outline-none transition-shadow focus:border-gray-900 focus:shadow-md"
                            />
                        ))}
                    </motion.div>
                    <p className="sr-only" aria-live="polite">{status}</p>
                </motion.div>
            </div>
        </div>
    )
}
