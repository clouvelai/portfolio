// Comprehensive bot detection and user agent parsing

export function detectBot(userAgent) {
    // Comprehensive bot patterns
    const botPatterns = [
        // Search engine bots
        /googlebot/i,
        /bingbot/i,
        /slurp/i, // Yahoo
        /duckduckbot/i,
        /baiduspider/i,
        /yandexbot/i,
        /sogou/i,
        /exabot/i,

        // Social media bots
        /facebookexternalhit/i,
        /twitterbot/i,
        /linkedinbot/i,
        /pinterestbot/i,
        /whatsapp/i,
        /telegrambot/i,
        /slackbot/i,
        /discordbot/i,

        // SEO/Analytics bots
        /ahrefsbot/i,
        /semrushbot/i,
        /mj12bot/i,
        /dotbot/i,
        /rogerbot/i,
        /screaming frog/i,

        // Generic bot indicators
        /bot/i,
        /crawler/i,
        /spider/i,
        /scraper/i,
        /crawling/i,
        /robot/i,
        /monitoring/i,
        /checker/i,

        // Headless browsers
        /headless/i,
        /phantom/i,
        /selenium/i,
        /webdriver/i,
        /puppeteer/i,
        /playwright/i,
    ]

    return botPatterns.some(pattern => pattern.test(userAgent))
}

export function getBotName(userAgent) {
    const botMap = {
        googlebot: 'Googlebot',
        bingbot: 'Bingbot',
        slurp: 'Yahoo Bot',
        duckduckbot: 'DuckDuckBot',
        baiduspider: 'Baidu Spider',
        yandexbot: 'Yandex Bot',
        facebookexternalhit: 'Facebook Bot',
        twitterbot: 'Twitter Bot',
        linkedinbot: 'LinkedIn Bot',
        pinterestbot: 'Pinterest Bot',
        ahrefsbot: 'Ahrefs Bot',
        semrushbot: 'Semrush Bot',
        mj12bot: 'Majestic Bot',
        dotbot: 'DotBot',
        screaming: 'Screaming Frog',
        headless: 'Headless Browser',
        phantom: 'PhantomJS',
        selenium: 'Selenium',
        puppeteer: 'Puppeteer',
        playwright: 'Playwright',
    }

    const lowerUA = userAgent.toLowerCase()
    for (const [key, name] of Object.entries(botMap)) {
        if (lowerUA.includes(key)) {
            return name
        }
    }

    return 'Unknown Bot'
}

export function parseUserAgent(userAgent) {
    // Parse browser
    let browser = 'Unknown'
    if (/edg/i.test(userAgent)) browser = 'Edge'
    else if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) browser = 'Chrome'
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari'
    else if (/firefox/i.test(userAgent)) browser = 'Firefox'
    else if (/opera|opr/i.test(userAgent)) browser = 'Opera'

    // Parse OS
    let os = 'Unknown'
    if (/windows/i.test(userAgent)) os = 'Windows'
    else if (/mac os x/i.test(userAgent)) os = 'macOS'
    else if (/linux/i.test(userAgent)) os = 'Linux'
    else if (/android/i.test(userAgent)) os = 'Android'
    else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'iOS'

    // Parse device type
    let device = 'Desktop'
    if (/mobile/i.test(userAgent)) device = 'Mobile'
    else if (/tablet|ipad/i.test(userAgent)) device = 'Tablet'

    return {
        browser,
        os,
        device,
        full: `${browser} on ${os}`
    }
}
