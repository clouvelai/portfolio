# Database Migration Instructions

## Run this SQL in Supabase SQL Editor

You need to add new columns to the `visits` table to support the enhanced analytics features.

### Steps:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **"SQL Editor"** in the left sidebar
4. Click **"New Query"**
5. Copy and paste the SQL from `supabase-migration.sql`
6. Click **"Run"** (or press Cmd/Ctrl + Enter)

### What this migration adds:

- `browser` column - Browser name (Chrome, Safari, Firefox, etc.)
- `os` column - Operating system (Windows, macOS, Linux, iOS, Android)
- `device` column - Device type (Desktop, Mobile, Tablet)
- `bot_name` column - Name of the bot if detected (Googlebot, Bingbot, etc.)
- Indexes for better query performance

### After running the migration:

Your analytics will start tracking:
- **For humans**: Browser and OS information (e.g., "Chrome on macOS")
- **For bots**: Specific bot names (e.g., "Googlebot", "Bingbot")

The honeypot-based bot detection is now the primary method, making bot identification much more accurate!
