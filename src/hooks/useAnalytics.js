import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useLocation } from 'react-router-dom'
import { detectBot, getBotName, parseUserAgent } from '../utils/userAgentParser'

export function useAnalytics() {
    const location = useLocation()
    const [honeypotInteracted, setHoneypotInteracted] = useState(false)

    useEffect(() => {
        // Create invisible honeypot element
        const honeypot = document.createElement('input')
        honeypot.type = 'text'
        honeypot.name = 'email_confirm' // Common bot target
        honeypot.id = 'email_confirm'
        honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;'
        honeypot.tabIndex = -1
        honeypot.setAttribute('aria-hidden', 'true')
        honeypot.autocomplete = 'off'

        // Add event listeners to detect bot interaction
        const handleHoneypotInteraction = () => setHoneypotInteracted(true)
        honeypot.addEventListener('focus', handleHoneypotInteraction)
        honeypot.addEventListener('input', handleHoneypotInteraction)
        honeypot.addEventListener('change', handleHoneypotInteraction)

        document.body.appendChild(honeypot)

        // Cleanup
        return () => {
            honeypot.removeEventListener('focus', handleHoneypotInteraction)
            honeypot.removeEventListener('input', handleHoneypotInteraction)
            honeypot.removeEventListener('change', handleHoneypotInteraction)
            document.body.removeChild(honeypot)
        }
    }, [])

    useEffect(() => {
        const trackVisit = async () => {
            const userAgent = navigator.userAgent

            // Primary bot detection: honeypot interaction
            const honeypotDetected = honeypotInteracted

            // Secondary bot detection: user agent analysis
            const userAgentDetected = detectBot(userAgent)

            // Tertiary bot detection: WebDriver and other browser features
            const isWebDriver = navigator.webdriver
            const hasPhantomJS = !!(window.phantom || window._phantom || window.callPhantom)
            const hasNightmare = !!window.__nightmare
            const chromeRuntime = !!(window.chrome && window.chrome.runtime)
            const hasAutomation = navigator.webdriver || hasPhantomJS || hasNightmare

            // Final bot determination (honeypot is primary indicator)
            const isBot = honeypotDetected || userAgentDetected || hasAutomation

            // Parse user agent for additional info
            const { browser, os, device } = parseUserAgent(userAgent)

            // Get bot name if it's a bot
            const botName = isBot && userAgentDetected ? getBotName(userAgent) : null

            try {
                await supabase.from('visits').insert([
                    {
                        user_agent: userAgent,
                        is_bot: isBot,
                        path: location.pathname,
                        browser,
                        os,
                        device,
                        bot_name: botName,
                    },
                ])
            } catch (error) {
                console.error('Error tracking visit:', error)
            }
        }

        // Small delay to allow honeypot to be interacted with by bots
        const timer = setTimeout(trackVisit, 100)
        return () => clearTimeout(timer)
    }, [location, honeypotInteracted])
}
