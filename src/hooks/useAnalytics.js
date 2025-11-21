import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useLocation } from 'react-router-dom'

export function useAnalytics() {
    const location = useLocation()

    useEffect(() => {
        const trackVisit = async () => {
            const userAgent = navigator.userAgent
            // Expanded regex for better bot detection
            const botRegex = /bot|googlebot|crawler|spider|robot|crawling|facebookexternalhit|bingbot|msnbot|duckduckbot|baiduspider|yandexbot|slurp|twitterbot/i

            // Check for WebDriver (common in automated browsers like Selenium/Puppeteer)
            const isWebDriver = navigator.webdriver

            const isBot = botRegex.test(userAgent) || isWebDriver

            try {
                await supabase.from('visits').insert([
                    {
                        user_agent: userAgent,
                        is_bot: isBot,
                        path: location.pathname,
                    },
                ])
            } catch (error) {
                console.error('Error tracking visit:', error)
            }
        }

        trackVisit()
    }, [location])
}
