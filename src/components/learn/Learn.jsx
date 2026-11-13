import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import PinGate from './PinGate'

const STORAGE_KEY = 'learn-ai-unlocked'

export default function Learn() {
    const [unlocked, setUnlocked] = useState(() => {
        try {
            return sessionStorage.getItem(STORAGE_KEY) === '1'
        } catch {
            return false
        }
    })

    if (!unlocked) {
        return (
            <PinGate
                onUnlock={() => {
                    try {
                        sessionStorage.setItem(STORAGE_KEY, '1')
                    } catch {
                        // The in-memory flag still opens the guides for this view.
                    }
                    setUnlocked(true)
                }}
            />
        )
    }

    return <Outlet />
}
