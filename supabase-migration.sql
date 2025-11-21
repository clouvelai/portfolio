-- Add new columns to visits table for enhanced analytics

-- Add browser column
ALTER TABLE public.visits ADD COLUMN IF NOT EXISTS browser TEXT;

-- Add OS column
ALTER TABLE public.visits ADD COLUMN IF NOT EXISTS os TEXT;

-- Add device type column
ALTER TABLE public.visits ADD COLUMN IF NOT EXISTS device TEXT;

-- Add bot name column (null for humans)
ALTER TABLE public.visits ADD COLUMN IF NOT EXISTS bot_name TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_visits_browser ON public.visits(browser);
CREATE INDEX IF NOT EXISTS idx_visits_os ON public.visits(os);
CREATE INDEX IF NOT EXISTS idx_visits_device ON public.visits(device);
CREATE INDEX IF NOT EXISTS idx_visits_bot_name ON public.visits(bot_name);

-- Add comment to table
COMMENT ON COLUMN public.visits.browser IS 'Browser name (Chrome, Safari, Firefox, etc.)';
COMMENT ON COLUMN public.visits.os IS 'Operating system (Windows, macOS, Linux, iOS, Android)';
COMMENT ON COLUMN public.visits.device IS 'Device type (Desktop, Mobile, Tablet)';
COMMENT ON COLUMN public.visits.bot_name IS 'Name of the bot if detected (Googlebot, Bingbot, etc.)';
