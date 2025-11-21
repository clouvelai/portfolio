import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Honeypot({ trapType = 'hidden_link', path = '/sitemap-hidden.xml' }) {
    useEffect(() => {
        const logHoneypotVisit = async () => {
            const userAgent = navigator.userAgent
            const referrer = document.referrer || 'direct'
            const timestamp = new Date().toISOString()

            try {
                // Explicitly log as a bot because they hit the honeypot
                await supabase.from('visits').insert([
                    {
                        user_agent: userAgent,
                        is_bot: true,
                        path: `${path} (HONEYPOT)`,
                        trap_type: trapType,
                        // Additional metadata for analysis
                        created_at: timestamp,
                    },
                ])

                console.log(`🍯 Honeypot triggered: ${trapType}`)
            } catch (error) {
                console.error('Error logging honeypot visit:', error)
            }
        }

        logHoneypotVisit()
    }, [trapType, path])

    // Render nothing - this is a trap page
    return null
}
