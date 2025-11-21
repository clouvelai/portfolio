import { useState } from 'react'

/**
 * Hidden form field honeypot component
 * Bots often fill all form fields, while humans can't see this field
 */
export default function HiddenFormHoneypot({ onBotDetected }) {
    const [honeypotValue, setHoneypotValue] = useState('')

    // If the honeypot field is filled, it's a bot
    const handleChange = (e) => {
        const value = e.target.value
        setHoneypotValue(value)

        if (value && onBotDetected) {
            onBotDetected('hidden_form_field')
        }
    }

    return (
        <>
            {/* Hidden using multiple techniques to ensure it's invisible to humans */}
            <input
                type="text"
                name="website"
                id="website"
                value={honeypotValue}
                onChange={handleChange}
                autoComplete="off"
                tabIndex="-1"
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            />
            {/* Alternative hidden field with different technique */}
            <div style={{ display: 'none' }}>
                <label htmlFor="confirm_email">Confirm Email</label>
                <input
                    type="email"
                    name="confirm_email"
                    id="confirm_email"
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex="-1"
                />
            </div>
        </>
    )
}
