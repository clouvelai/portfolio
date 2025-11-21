import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Honeypot() {
    useEffect(() => {
        const logHoneypotVisit = async () => {
            const userAgent = navigator.userAgent
            try {
                // Explicitly log as a bot because they hit the honeypot
                await supabase.from('visits').insert([
                    {
                        user_agent: userAgent,
                        is_bot: true,
                        path: '/sitemap-hidden.xml (HONEYPOT)',
                    },
                ])
            } catch (error) {
                console.error('Error logging honeypot visit:', error)
            }
        }

        logHoneypotVisit()
    }, [])

    // Render nothing or a fake XML structure if needed, but empty is fine for a hidden route
    return null
}
